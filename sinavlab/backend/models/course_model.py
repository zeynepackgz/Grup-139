from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from databse.db_connection import Base

student_courses = Table(
    'student_courses',
    Base.metadata,
    Column('student_id', Integer, ForeignKey('student.id')),
    Column('course_id', Integer, ForeignKey('courses.id'))
)

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
    students = relationship("Student", secondary=student_courses, back_populates="courses")

# class Student(Base):
#     __tablename__ = 'students'
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     courses = relationship("Course", secondary=student_courses, back_populates="students")