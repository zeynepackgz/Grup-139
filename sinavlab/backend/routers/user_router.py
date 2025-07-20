from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from databse.db_connection import get_db
from controllers.user_controller import UserController
from schemas.user import UserCreate


router = APIRouter()

@router.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return UserController.create_user(db, user)

@router.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return UserController.get_users(db)
