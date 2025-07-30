from sqlalchemy import Column, Integer, ForeignKey, Float, UniqueConstraint
from sqlalchemy.orm import relationship
from databse.db_connection import Base

class Grade(Base):
    __tablename__ = "grades"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    value = Column(Float, nullable=False)

    student = relationship("Student", back_populates="grades")
    course = relationship("Course", back_populates="grades")

    __table_args__ = (
        UniqueConstraint('student_id', 'course_id', name='_student_course_uc'),
    )