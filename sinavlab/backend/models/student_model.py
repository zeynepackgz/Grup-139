from sqlalchemy import Column, ForeignKey, Integer, String, Date
from databse.db_connection import Base
from sqlalchemy.orm import relationship
from models.association_tables import student_courses

class Student(Base):
    __tablename__ = "student"  

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)  
    student_number = Column(String, unique=True, nullable=False)  
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    gender = Column(String, nullable=True)  
    date_of_birth = Column(Date, nullable=True)
    address = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=True)

    class_id = Column(Integer, ForeignKey("class.id", ondelete="CASCADE"), nullable=False)
    class_info = relationship("Class", back_populates="students") 

    # Ders ilişkisi (çoktan çoğa)
    courses = relationship(
        "Course",
        secondary="student_courses",  # Association table adı
    back_populates="students"
)
    grades = relationship("Grade", back_populates="student")