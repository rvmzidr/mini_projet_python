from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Float, Boolean, MetaData, Table
import databases
from groq import Groq

# Database setup
DATABASE_URL = "postgresql+asyncpg://postgres:password@postgres:5432/bookdb"
database = databases.Database(DATABASE_URL)
metadata = MetaData()

recommended_books = Table(
    "recommended_books",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String),
    Column("price", Float),
    Column("category", String),
    Column("availability", Boolean),
    Column("image_url", String, nullable=True),
)

# Create async engine
engine = create_async_engine(DATABASE_URL)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# Groq client setup
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI(title="Book Recommendation API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Book(BaseModel):
    id: int
    title: str
    price: float
    category: str
    availability: bool
    image_url: Optional[str] = None

class BookCreate(BaseModel):
    title: str
    price: float
    category: str
    availability: bool
    image_url: Optional[str] = None

# Database events
@app.on_event("startup")
async def startup():
    await database.connect()
    async with engine.begin() as conn:
        await conn.run_sync(metadata.create_all)

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Dependency to get DB session
async def get_db():
    async with async_session() as session:
        yield session

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)