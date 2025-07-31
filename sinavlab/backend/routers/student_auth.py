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


@router.post("/login")
def student_login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print("Form email:", form_data.username)
    print("Form password:", form_data.password)

    student = db.query(Student).filter(
        Student.email == form_data.username,
        Student.password == form_data.password
    ).first()

    print("Öğrenci bulundu mu?:", student)

    if not student:
        raise HTTPException(status_code=401, detail="Yanlış şifre veya mail!")

    token = create_access_token(data={ "email": student.email, "id": str(student.id)})
    return {"access_token": token, "token_type": "bearer"}