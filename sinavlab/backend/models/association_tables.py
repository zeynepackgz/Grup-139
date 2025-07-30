from sqlalchemy import Table, Column, Integer, ForeignKey
from databse.db_connection import Base

class_courses = Table(
    'class_courses',
    Base.metadata,
    Column('class_id', Integer, ForeignKey('class.id')),
    Column('course_id', Integer, ForeignKey('courses.id'))
)

student_courses = Table(
    'student_courses',
    Base.metadata,
    Column('student_id', Integer, ForeignKey('student.id')),
    Column('course_id', Integer, ForeignKey('courses.id'))
)
