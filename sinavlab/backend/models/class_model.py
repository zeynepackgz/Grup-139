from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from models.course_model import Course
from models.association_tables import class_courses
from databse.db_connection import Base

class Class(Base):
    __tablename__ = "class"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

    students = relationship("Student", back_populates="class_info")
    courses = relationship("Course", secondary=class_courses, back_populates="classes")
