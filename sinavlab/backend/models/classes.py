
from sqlalchemy import Column, ForeignKey, Integer, String
from databse.db_connection import Base
from sqlalchemy.orm import relationship
class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False, unique=True)