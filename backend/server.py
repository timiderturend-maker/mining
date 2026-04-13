from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware
import logging
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import database client to start and close connections
from database import client, db

# Import the routers
from auth_router import router as auth_router
from cart_router import router as cart_router

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Include routers inside the /api prefix router
api_router.include_router(auth_router)
api_router.include_router(cart_router)

# Include the main router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
