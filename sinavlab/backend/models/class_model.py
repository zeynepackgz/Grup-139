from sqlalchemy import Column, ForeignKey, Integer, String
from databse.db_connection import Base
from sqlalchemy.orm import relationship

class Class(Base):
    __tablename__ = "class"  

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True, nullable=False, unique=True) 

    students = relationship("Student", back_populates="class_info", cascade="all, delete", passive_deletes=True)
