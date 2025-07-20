from fastapi import APIRouter, Depends
from typing import Annotated  # Corrected import
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

from models.classes import Class
from databse.db_connection import get_db
from schemas.classes import ClassCreate


# Router setup
router = APIRouter(
    prefix="/classes",
    tags=["classes"]
)

# Dependency
db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/add_class")  # Fixed decorator and added path
async def add_class(
    class_data: ClassCreate,  # Added request model
    db: db_dependency  # Corrected dependency injection
):
    """
    Add a new class to the database.
    """
    db_class = Class(name=class_data.name)
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class

@router.get("/get_class")  # Fixed decorator and added path
async def add_class(
    class_data: ClassCreate,  # Added request model
    db: db_dependency  # Corrected dependency injection
):
    """
    Add a new class to the database.
    """
    db_class = Class(name=class_data.name)
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class