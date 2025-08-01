from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordRequestForm


from databse.db_connection import Base,engine
# from routers.user_router import router as user_router
from routers.class_router import router as class_router
from routers.teachers import router as teachers
from routers.student_router import router as student_router
# Base.metadata.drop_all(bind=engine)
from models.student_model import Student
from models.class_model import Class
from models.grade_model import Grade
from routers.course_router import router as course_router
Base.metadata.create_all(bind=engine)
from routers.grade_router import router as grade_router
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from databse.db_connection import get_db
from models.student_model import Student
from auth import create_access_token

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
app = FastAPI()
from routers.student_auth import router as student_auth_router
app.include_router(student_auth_router)


# app.include_router(user_router)
app.include_router(class_router)
# app.include_router(teachers)
app.include_router(student_router)
# app.include_router(courses)
app.include_router(course_router)
app.include_router(grade_router)

@app.get("/")
def home():
    return {"home endpoint"}

@app.post("/token")
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

class Config:
    from_attributes = True
