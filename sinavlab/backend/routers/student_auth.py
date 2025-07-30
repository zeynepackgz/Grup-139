from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from databse.db_connection import get_db
from models.student_model import Student
from auth import create_access_token

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from auth import decode_access_token

router = APIRouter(prefix="/student-auth", tags=["student-auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/student-auth/login")

@router.get("/protected-student")
def protected_student(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Geçersiz token")
    return {"message": "Token ile erişildi!", "student_number": payload["sub"]}


class StudentLoginRequest(BaseModel):
    student_number: str
    first_name: str
    last_name: str

@router.post("/login")
def student_login(request: StudentLoginRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(
        Student.student_number == request.student_number,
        Student.first_name == request.first_name,
        Student.last_name == request.last_name
    ).first()
    if not student:
        raise HTTPException(status_code=401, detail="Geçersiz öğrenci bilgileri")
    token = create_access_token(data={"sub": student.student_number})
    return {"access_token": token, "token_type": "bearer"}