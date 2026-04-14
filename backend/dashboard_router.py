from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone, timedelta
import random

from auth_router import get_current_user
from database import db

router = APIRouter(prefix="/dashboard")

@router.get("/")
async def get_dashboard_data(user: dict = Depends(get_current_user)):
    user_id = user["user_id"]
    
    # Fetch orders
    orders_cursor = db.orders.find({"user_id": user_id}, {"_id": 0}).sort("created_at", -1)
    orders = await orders_cursor.to_list(length=100)
    
    # Fetch contracts
    contracts_cursor = db.contracts.find({"user_id": user_id}, {"_id": 0}).sort("created_at", -1)
    contracts = await contracts_cursor.to_list(length=100)
    
    # Calculate payout eligibility
    # Rule: Payout is allowed only 90 days after the FIRST mining start
    first_mining_start = None
    total_accumulated = 0.0
    
    # Simulate some mining progress based on time passed
    now = datetime.now(timezone.utc)
    for c in contracts:
        if c.get("mining_started_at"):
            start_date = c["mining_started_at"]
            if isinstance(start_date, str):
                start_date = datetime.fromisoformat(start_date)
            if start_date.tzinfo is None:
                start_date = start_date.replace(tzinfo=timezone.utc)
            
            # Find earliest start
            if not first_mining_start or start_date < first_mining_start:
                first_mining_start = start_date
                
            # Simulate earnings: e.g. 0.00001 BTC per day
            days_mining = max(0, (now - start_date).days)
            # Add some randomness for realism
            simulated_earning = days_mining * 0.000012 + random.uniform(0, 0.000005)
            c["accumulated_btc"] = round(simulated_earning, 8)
            total_accumulated += simulated_earning

    payout_unlocked = False
    days_until_payout = 90
    unlock_date = None
    
    if first_mining_start:
        unlock_date = first_mining_start + timedelta(days=90)
        if now >= unlock_date:
            payout_unlocked = True
            days_until_payout = 0
        else:
            days_until_payout = (unlock_date - now).days

    return {
        "orders": orders,
        "contracts": contracts,
        "total_accumulated_btc": round(total_accumulated, 8),
        "payout_unlocked": payout_unlocked,
        "days_until_payout": days_until_payout,
        "payout_unlock_date": unlock_date.isoformat() if unlock_date else None,
        "first_mining_start": first_mining_start.isoformat() if first_mining_start else None
    }

@router.post("/start-mining/{contract_id}")
async def start_mining(contract_id: str, user: dict = Depends(get_current_user)):
    user_id = user["user_id"]
    contract = await db.contracts.find_one({"contract_id": contract_id, "user_id": user_id})
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
        
    if contract.get("status") == "ACTIVE":
        raise HTTPException(status_code=400, detail="Mining is already active")
        
    await db.contracts.update_one(
        {"contract_id": contract_id},
        {
            "$set": {
                "status": "ACTIVE",
                "mining_started_at": datetime.now(timezone.utc)
            }
        }
    )
    
    return {"message": "Mining started successfully"}

@router.post("/payout")
async def request_payout(user: dict = Depends(get_current_user)):
    # Re-evaluate eligibility securely
    user_id = user["user_id"]
    contracts_cursor = db.contracts.find({"user_id": user_id, "status": "ACTIVE"})
    contracts = await contracts_cursor.to_list(length=100)
    
    if not contracts:
        raise HTTPException(status_code=400, detail="No active mining contracts")
        
    first_mining_start = min(
        [c["mining_started_at"] for c in contracts if c.get("mining_started_at")]
    )
    
    if isinstance(first_mining_start, str):
        first_mining_start = datetime.fromisoformat(first_mining_start)
    if first_mining_start.tzinfo is None:
        first_mining_start = first_mining_start.replace(tzinfo=timezone.utc)
        
    now = datetime.now(timezone.utc)
    if now < first_mining_start + timedelta(days=90):
        raise HTTPException(status_code=403, detail="Payout is locked for 90 days after first start")
        
    # Simulate payout
    # Reset accumulated_btc
    await db.contracts.update_many(
        {"user_id": user_id, "status": "ACTIVE"},
        {"$set": {"accumulated_btc": 0.0}}
    )
    
    return {"message": "Payout initiated successfully. BTC will be transferred to your wallet."}
