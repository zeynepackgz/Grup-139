from pydantic import BaseModel


class ClassCreate(BaseModel):
    name: str

class ClassUpdate(BaseModel):
    new_class_name: str
