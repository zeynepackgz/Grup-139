from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from databse.db_connection import get_db
from models.grade_model import Grade
from auth import decode_access_token  # Import the function from your auth utility

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter(prefix="/grades", tags=["grades"])

class GradeCreate(BaseModel):
    student_id: int
    course_id: int
    value: float

class GradeOut(GradeCreate):
    id: int
    class Config:
        orm_mode = True

@router.post("/", response_model=GradeOut)
def add_grade(
    grade: GradeCreate, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Geçersiz veya eksik token.")

    # Aynı öğrenci ve ders için not var mı kontrol et
    existing_grade = db.query(Grade).filter(
        Grade.student_id == grade.student_id,
        Grade.course_id == grade.course_id
    ).first()
    if existing_grade:
        raise HTTPException(status_code=400, detail="Bu öğrenci için bu derste zaten bir not var.")
    db_grade = Grade(**grade.dict())
    db.add(db_grade)
    db.commit()
    db.refresh(db_grade)
    return db_grade

@router.get("/", response_model=List[GradeOut])
def get_all_grades(db: Session = Depends(get_db)):
    return db.query(Grade).all()

@router.get("/student/{student_id}", response_model=List[GradeOut])
def get_grades_by_student(
    student_id: int,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Geçersiz veya eksik token.")
    return db.query(Grade).filter(Grade.student_id == student_id).all()

@router.get("/course/{course_id}", response_model=List[GradeOut])
def get_grades_by_course(course_id: int,db: Session = Depends(get_db),):
    return db.query(Grade).filter(Grade.course_id == course_id).all()

@router.put("/{grade_id}", response_model=GradeOut)
def update_grade(
    grade_id: int,
    grade: GradeCreate,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Geçersiz veya eksik token.")
    db_grade = db.query(Grade).filter(Grade.id == grade_id).first()
    if not db_grade:
        raise HTTPException(status_code=404, detail="Grade not found")
    db_grade.student_id = grade.student_id
    db_grade.course_id = grade.course_id
    db_grade.value = grade.value
    db.commit()
    db.refresh(db_grade)
    return db_grade