from fastapi import APIRouter, Request, Response, HTTPException, Depends
from pydantic import BaseModel
import httpx
import uuid
from datetime import datetime, timezone, timedelta
import logging

from database import db

router = APIRouter(prefix="/auth")
logger = logging.getLogger(__name__)

class SessionData(BaseModel):
    session_id: str

@router.post("/exchange")
async def exchange_session(data: SessionData, response: Response):
    try:
        async with httpx.AsyncClient() as client:
            auth_resp = await client.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": data.session_id}
            )
        
        if auth_resp.status_code != 200:
            logger.error(f"Auth server returned {auth_resp.status_code}: {auth_resp.text}")
            raise HTTPException(status_code=401, detail="Invalid session_id")
            
        user_info = auth_resp.json()
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        session_token = user_info.get("session_token")
        
        if not email or not session_token:
            raise HTTPException(status_code=401, detail="Missing vital auth info")

        # check if user exists
        user_doc = await db.users.find_one({"email": email})
        if not user_doc:
            user_id = f"user_{uuid.uuid4().hex[:12]}"
            user_doc = {
                "user_id": user_id,
                "email": email,
                "name": name,
                "picture": picture,
                "created_at": datetime.now(timezone.utc)
            }
            await db.users.insert_one(user_doc)
        else:
            user_id = user_doc["user_id"]
            
            # Optional: Update user info if necessary
            await db.users.update_one(
                {"user_id": user_id},
                {"$set": {"name": name, "picture": picture}}
            )
            user_doc["name"] = name
            user_doc["picture"] = picture
        
        # Store session_token
        expires_at = datetime.now(timezone.utc) + timedelta(days=7)
        await db.user_sessions.insert_one({
            "user_id": user_id,
            "session_token": session_token,
            "expires_at": expires_at,
            "created_at": datetime.now(timezone.utc)
        })
        
        # Set HTTP Only cookie
        response.set_cookie(
            key="session_token",
            value=session_token,
            path="/",
            secure=True,
            httponly=True,
            samesite="none",
            max_age=7 * 24 * 60 * 60
        )
        
        # Return user without MongoDB _id
        user_data = {
            "user_id": user_id,
            "email": email,
            "name": user_doc.get("name"),
            "picture": user_doc.get("picture")
        }
        return {"message": "Success", "user": user_data}
    except Exception as e:
        logger.error(f"Error in exchange_session: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

async def get_current_user(request: Request):
    session_token = request.cookies.get("session_token")
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
        else:
            raise HTTPException(status_code=401, detail="Not authenticated")
    
    session_doc = await db.user_sessions.find_one({"session_token": session_token})
    if not session_doc:
        raise HTTPException(status_code=401, detail="Invalid session")
        
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
        
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
        
    user_doc = await db.users.find_one({"user_id": session_doc["user_id"]}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
        
    return user_doc

@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    return user

@router.post("/logout")
async def logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_many({"session_token": session_token})
    
    response.delete_cookie("session_token", path="/", secure=True, httponly=True, samesite="none")
    return {"message": "Logged out"}
