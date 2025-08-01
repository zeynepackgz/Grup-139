from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from databse.db_connection import get_db
from models.student_model import Student
from auth import create_access_token

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth import decode_access_token,oauth2_scheme

router = APIRouter(prefix="/student-auth", tags=["student-auth"])


@router.get("/protected-student")
def protected_student(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    print(payload)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Geçersiz token")
    return {"message": "Token ile erişildi!", "student_number": payload["sub"]}


class StudentLoginRequest(BaseModel):
    email: str
    password: str


