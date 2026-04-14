from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

from database import db

router = APIRouter(prefix="/products")

class ProductSpecs(BaseModel):
    hashrate: str = None
    power_consumption: str = None
    algorithm: str = None
    maintenance_fee: str = None
    availability: str = None

class Product(BaseModel):
    id: str
    title: str
    type: str
    category: str
    price: float
    originalPrice: float
    discount: int
    image: str
    inStock: bool
    rating: float
    description: str
    long_description: str
    specs: ProductSpecs

@router.get("/", response_model=List[Product])
async def get_products(category: str = None):
    query = {}
    if category and category != "Alle Verträge":
        query["category"] = category
        
    cursor = db.products.find(query, {"_id": 0})
    products = await cursor.to_list(length=100)
    return products

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
