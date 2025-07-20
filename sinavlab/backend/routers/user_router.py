from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.databse.db_connection import get_db
from backend.controllers import user_controller
from backend.schemas.user import UserCreate


router = APIRouter()

@router.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return user_controller.create_user(db, user)

@router.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return user_controller.get_users(db)
