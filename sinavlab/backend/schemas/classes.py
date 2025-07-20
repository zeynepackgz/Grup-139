from pydantic import BaseModel


class ClassCreate(BaseModel):
    name: str