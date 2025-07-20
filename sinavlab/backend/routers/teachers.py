from typing_extensions import Annotated
from fastapi import APIRouter
from fastapi import APIRouter, Depends
from typing import Annotated  # Corrected import
from sqlalchemy.orm import Session

from databse.db_connection import get_db

router = APIRouter(
    prefix='/teachers',
    tags=['teachers']
)
db_dependency = Annotated[Session, Depends(get_db)]

@router.post('/add_teact')
async def add_teacher(db:db_dependency):
    return

