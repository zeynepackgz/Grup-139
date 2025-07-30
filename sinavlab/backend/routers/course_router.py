from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from databse.db_connection import get_db
from models.course_model import Course
from pydantic import BaseModel

router = APIRouter(
    prefix='/courses',
    tags=['courses']
)

class CourseCreate(BaseModel):
    name: str
    description: str = None

@router.post("/", response_model=CourseCreate)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(name=course.name, description=course.description)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.get("/", response_model=List[CourseCreate])
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

@router.put("/{course_id}", response_model=CourseCreate)
def update_course(course_id: int, course: CourseCreate, db: Session = Depends(get_db)):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    db_course.name = course.name
    db_course.description = course.description
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(db_course)
    db.commit()
    return {"ok": True}