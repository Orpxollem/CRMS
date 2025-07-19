from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

class User(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    firstname: str
    lastname: str
    email: EmailStr
    phone: Optional[str] = None
    job_title: Optional[str] = None
    company: Optional[str] = None
    department: Optional[str] = None
    hashed_password: str
    role: str  # e.g. 'admin' or 'user'

class Contact(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    email: EmailStr
    phone: str
    company: str
    position: str
    avatar: Optional[str]
    status: str  # 'active' | 'inactive' | 'prospect'
    lastContact: Optional[str]
    tags: Optional[List[str]]
    notes: Optional[str]
    createdAt: Optional[str]
