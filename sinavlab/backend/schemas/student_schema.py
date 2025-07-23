from pydantic import BaseModel
from typing import Optional
from datetime import date

class StudentCreate(BaseModel):
    student_number: str
    first_name: str
    last_name: str
    gender: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    class_name: str  # onemli (hangi class a ait oldugu bilgisi daha sonra class ismine gore id alinacak ve eklenecek)


class StudentUpdate(BaseModel):
    student_number: str  # arama icin kullanilacak
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    class_name: Optional[str] = None  # kayitli oldugu class da degistirilebilir