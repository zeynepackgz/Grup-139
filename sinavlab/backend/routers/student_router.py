from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from models.student_model import Student
from models.class_model import Class
from schemas.student_schema import StudentCreate, StudentUpdate
from databse.db_connection import get_db

router = APIRouter(
    prefix="/students",
    tags=["students"]
)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_student(student_data: StudentCreate, db: Session = Depends(get_db)):
    db_class = db.query(Class).filter(Class.name == student_data.class_name).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")

    existing_student = db.query(Student).filter(
        (Student.student_number == student_data.student_number) | 
        (Student.email == student_data.email)
    ).first()

    if existing_student:
        raise HTTPException(status_code=400, detail="Student with this number or email already exists")

    new_student = Student(
        student_number=student_data.student_number,
        first_name=student_data.first_name,
        last_name=student_data.last_name,
        gender=student_data.gender,
        date_of_birth=student_data.date_of_birth,
        address=student_data.address,
        phone_number=student_data.phone_number,
        email=student_data.email,
        class_id=db_class.id 
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {
        "message": "Student added successfully",
        "student_id": new_student.id,
        "student_name": f"{new_student.first_name} {new_student.last_name}",
        "class_name": db_class.name
    }

@router.delete("/{student_id}", status_code=status.HTTP_200_OK)
async def delete_student_by_id(student_id: int, db: Session = Depends(get_db)):
    db_student = db.query(Student).filter(Student.id == student_id).first()

    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    db.delete(db_student)
    db.commit()

    return {"message": f"Student with ID {student_id} deleted successfully"}

@router.put("/{student_id}", status_code=status.HTTP_200_OK)
async def update_student_by_id(student_id: int, student_data: StudentUpdate, db: Session = Depends(get_db)):
    db_student = db.query(Student).filter(Student.id == student_id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")

    if student_data.class_name:
        db_class = db.query(Class).filter(Class.name == student_data.class_name).first()
        if not db_class:
            raise HTTPException(status_code=404, detail="New class not found")
        db_student.class_id = db_class.id

    if student_data.first_name is not None:
        db_student.first_name = student_data.first_name
    if student_data.last_name is not None:
        db_student.last_name = student_data.last_name
    if student_data.gender is not None:
        db_student.gender = student_data.gender
    if student_data.date_of_birth is not None:
        db_student.date_of_birth = student_data.date_of_birth
    if student_data.address is not None:
        db_student.address = student_data.address
    if student_data.phone_number is not None:
        db_student.phone_number = student_data.phone_number
    if student_data.email is not None:
        db_student.email = student_data.email

    db.commit()
    db.refresh(db_student)

    return {
        "message": "Student updated successfully",
        "student_id": db_student.id
    }
@router.get("/", status_code=status.HTTP_200_OK)
async def get_all_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()

    if not students:
        return {"message": "No students found"}

    result = []
    for student in students:
        result.append({
            "student_id": student.id,
            "student_number": student.student_number,
            "first_name": student.first_name,
            "last_name": student.last_name,
            "gender": student.gender,
            "date_of_birth": student.date_of_birth,
            "address": student.address,
            "phone_number": student.phone_number,
            "email": student.email,
            "class_id": student.class_id,
            "class_name": student.class_info.name if student.class_info else None
        })

    return {"students": result}

@router.get("/{student_id}/courses")
def get_courses_from_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    class_courses = student.class_info.courses if student.class_info else []

    return {
        "student_id": student.id,
        "class_id": student.class_info.id if student.class_info else None,
        "courses": [
            {
                "id": course.id,
                "name": course.name,
                "description": course.description
            }
            for course in class_courses
        ]
    }

