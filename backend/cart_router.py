from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone
import uuid

from auth_router import get_current_user
from database import db

router = APIRouter(prefix="/cart")

class CartItem(BaseModel):
    product_id: str
    quantity: int = 1
    price: float
    title: str
    image: str

class CartUpdate(BaseModel):
    items: List[CartItem]

@router.get("/")
async def get_cart(user: dict = Depends(get_current_user)):
    user_id = user["user_id"]
    cart_doc = await db.carts.find_one({"user_id": user_id}, {"_id": 0})
    if not cart_doc:
        return {"items": [], "total": 0.0}
    return cart_doc

@router.post("/")
async def sync_cart(update: CartUpdate, user: dict = Depends(get_current_user)):
    user_id = user["user_id"]
    total = sum(item.price * item.quantity for item in update.items)
    
    cart_data = {
        "user_id": user_id,
        "items": [item.dict() for item in update.items],
        "total": total,
        "updated_at": datetime.now(timezone.utc)
    }
    
    await db.carts.update_one(
        {"user_id": user_id},
        {"$set": cart_data},
        upsert=True
    )
    return cart_data

class OrderCreate(BaseModel):
    total: float
    items: List[CartItem]

@router.post("/checkout")
async def checkout(order: OrderCreate, user: dict = Depends(get_current_user)):
    if not order.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
        
    order_id = f"ord_{uuid.uuid4().hex[:8]}"
    order_doc = {
        "order_id": order_id,
        "user_id": user["user_id"],
        "items": [item.dict() for item in order.items],
        "total": order.total,
        "status": "COMPLETED",
        "created_at": datetime.now(timezone.utc)
    }
    
    await db.orders.insert_one(order_doc)
    
    # clear cart
    await db.carts.delete_one({"user_id": user["user_id"]})
    
    return {"message": "Order successful", "order_id": order_id}
