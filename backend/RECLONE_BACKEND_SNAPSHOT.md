# Backend Snapshot for Recloning and Reimplementation

This file contains the current backend code and key configuration details to be used after recloning the main branch. It allows reimplementation of the backend integration from scratch to match the current state.

---

## 1. backend/database.py

```python
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db = None

db = Database()

async def connect_to_mongo(uri: str, db_name: str):
    db.client = AsyncIOMotorClient(uri)
    db.db = db.client[db_name]
    print("Connected to MongoDB")

async def close_mongo_connection():
    db.client.close()
    print("Closed MongoDB connection")
```

---

## 2. backend/models.py

```python
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date

class Contact(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    email: EmailStr
    phone: str
    company: str
    position: str
    avatar: str
    status: str  # 'active' | 'inactive' | 'prospect'
    lastContact: str
    tags: List[str]
    notes: str
    createdAt: str

class Deal(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    value: float
    stage: str  # 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
    probability: int
    contactId: str
    companyId: str
    expectedCloseDate: str
    createdAt: str
    lastUpdated: str

class Task(BaseModel):
    id: str = Field(..., alias="_id")
    title: str
    description: str
    type: str  # 'call' | 'email' | 'meeting' | 'follow-up' | 'other'
    priority: str  # 'low' | 'medium' | 'high'
    status: str  # 'pending' | 'completed' | 'overdue'
    dueDate: str
    contactId: Optional[str] = None
    dealId: Optional[str] = None
    createdAt: str

class Company(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    industry: str
    size: str
    website: str
    logo: str
    address: str
    phone: str
    email: EmailStr
    status: str  # 'active' | 'inactive' | 'prospect'
    revenue: float
    employees: int
    createdAt: str

class User(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    email: EmailStr
    avatar: str
    role: str
```

---

## 3. backend/requirements.txt

```
fastapi
uvicorn[standard]
motor
pydantic[email]
passlib[bcrypt]
PyJWT
```

---

## 4. backend/main.py

```python
import os
from fastapi import FastAPI, HTTPException, Depends, status
from typing import List
from backend.database import connect_to_mongo, close_mongo_connection, db
from backend.models import Contact, User
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.context import CryptContext
import jwt
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime, timedelta

app = FastAPI()

# Allow CORS for frontend localhost (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security settings
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key_here")  # Change this to a secure random key in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def get_user_by_email(email: str):
    user_data = await db.db.users.find_one({"email": email})
    if user_data:
        return User(**user_data)
    return None

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def authenticate_user(email: str, password: str):
    user = await get_user_by_email(email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    user = await get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

@app.on_event("startup")
async def startup_db_client():
    # Updated connection string with database name 'crms_db'
    mongo_uri = os.getenv("MONGO_URI", "mongodb+srv://ignyde:ignydesecurepass@cluster0.oz2znjo.mongodb.net/crms_db?retryWrites=true&w=majority&appName=Cluster0")
    await connect_to_mongo(mongo_uri, "crms_db")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/contacts", response_model=List[Contact])
async def get_contacts(current_user: User = Depends(get_current_active_admin)):
    contacts_cursor = db.db.contacts.find()
    contacts = []
    async for contact in contacts_cursor:
        contacts.append(Contact(**contact))
    return contacts

@app.post("/contacts", response_model=Contact)
async def create_contact(contact: Contact, current_user: User = Depends(get_current_active_admin)):
    contact_dict = contact.dict(by_alias=True)
    result = await db.db.contacts.insert_one(contact_dict)
    if result.inserted_id:
        return contact
    else:
        raise HTTPException(status_code=500, detail="Failed to create contact")
```

---

## 5. backend/create_admin.py

```python
import asyncio
from getpass import getpass
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext

import os
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from getpass import getpass

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://ignyde:ignydesecurepass@cluster0.oz2znjo.mongodb.net/crms_db?retryWrites=true&w=majority&appName=Cluster0")
DB_NAME = "crms_db"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_admin():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    users_collection = db.users

    username = input("Enter admin username: ")
    email = input("Enter admin email: ")
    password = getpass("Enter admin password: ")
    password_confirm = getpass("Confirm admin password: ")

    if password != password_confirm:
        print("Passwords do not match. Exiting.")
        return

    hashed_password = pwd_context.hash(password)

    admin_user = {
        "username": username,
        "email": email,
        "hashed_password": hashed_password,
        "role": "admin"
    }

    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        print(f"User with email {email} already exists.")
        return

    result = await users_collection.insert_one(admin_user)
    if result.inserted_id:
        print(f"Admin user {username} created successfully.")
    else:
        print("Failed to create admin user.")

    client.close()

if __name__ == "__main__":
    asyncio.run(create_admin())
```

---

## Key Configuration Items

- MongoDB connection URL (used in environment variable `MONGO_URI`):

```
mongodb+srv://ignyde:ignydesecurepass@cluster0.oz2znjo.mongodb.net/crms_db?retryWrites=true&w=majority&appName=Cluster0
```

- JWT Secret Key (used in environment variable `SECRET_KEY`):

```
your_secret_key_here
```

---

## Usage

After recloning the repository, use this file to restore the backend integration by replacing the above files with these contents. Set the environment variables `MONGO_URI` and `SECRET_KEY` accordingly before running the backend.

This will ensure the backend functions as currently integrated with the frontend.

---
