from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from databse.db_connection import Base
from models.association_tables import class_courses,student_courses



class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)

    classes = relationship("Class", secondary=class_courses, back_populates="courses")
    students = relationship("Student", secondary=student_courses, back_populates="courses")

