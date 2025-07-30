from typing import List, Optional
from pydantic import BaseModel


class CourseCreate(BaseModel):
    name: str
    description: Optional[str] = None
    class_ids: Optional[List[int]] = []

