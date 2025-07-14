from sqlalchemy import Column, Integer, String

from sinavlab.backend.databse.db_connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)