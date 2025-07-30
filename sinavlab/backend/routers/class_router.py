from fastapi import APIRouter, Depends, HTTPException, Path, status
from typing import Annotated  # Corrected import
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

from models.student_model import Student
from models.class_model import Class
from databse.db_connection import get_db
from schemas.class_schema import ClassCreate, ClassUpdate


# Router setup
router = APIRouter(
    prefix="/class",
    tags=["classes"]
)

# Dependency
db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/", response_model=ClassCreate, status_code=status.HTTP_201_CREATED)
async def add_class(
    class_data: ClassCreate,
    db: Session = Depends(get_db)
):
    existing_class = db.query(Class).filter(Class.name == class_data.name).first()
    if existing_class:
        raise HTTPException(status_code=400, detail="Class with this name already exists")

    db_class = Class(name=class_data.name)
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class

@router.get("/", )
async def get_classes(db: Session = Depends(get_db)):
    """
    Get all classes from the database.
    """
    classes = db.query(Class).all()
    if not classes:
        raise HTTPException(status_code=404, detail="No classes found")
    
    return JSONResponse(
        status_code=status.HTTP_200_OK, 
        content={
        "classes": [
            {"id": cls.id, "name": cls.name} for cls in classes
        ]
    }
    )


@router.put("/{class_id}", status_code=status.HTTP_200_OK)
async def update_class_name(
    class_id: int,
    update_class_data: ClassUpdate,  # new_class_name iceriyor
    db: Session = Depends(get_db)
):
    db_class = db.query(Class).filter(Class.id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")

    if db_class.name != update_class_data.new_class_name:
        existing = db.query(Class).filter(Class.name == update_class_data.new_class_name).first()
        if existing:
            raise HTTPException(status_code=400, detail="New class name already exists")

    db_class.name = update_class_data.new_class_name
    db.commit()
    db.refresh(db_class)

    return {
        "message": "Class name updated successfully",
        "class_id": db_class.id,
        "new_class_name": db_class.name
    }
@router.delete("/{class_id}", status_code=status.HTTP_200_OK)
async def delete_class(
    class_id: int,
    db: Session = Depends(get_db)
):
    db_class = db.query(Class).filter(Class.id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")

    db.delete(db_class)
    db.commit()

    return {"message": f"Class with id {class_id} deleted successfully"}

@router.get("/{student_id}/class")
def get_student_class(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    class_info = student.class_info
    if not class_info:
        return {"message": "Student is not assigned to a class"}

    return {
        "class_id": class_info.id,
        "class_name": class_info.name
    }




@router.get("/{class_id}/courses")
def get_courses_for_class(class_id: int, db: Session = Depends(get_db)):
    class_obj = db.query(Class).filter(Class.id == class_id).first()
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")

    return {
        "class_id": class_obj.id,
        "class_name": class_obj.name,
        "courses": [
            {"id": c.id, "name": c.name, "description": c.description}
            for c in class_obj.courses
        ]
    }
