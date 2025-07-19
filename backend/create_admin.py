import os
from getpass import getpass
from pymongo import MongoClient
from passlib.context import CryptContext
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "crms_db")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_admin():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    users_collection = db.users

    firstname = input("Enter admin first name: ")
    lastname = input("Enter admin last name: ")
    email = input("Enter admin email: ")
    phone = input("Enter admin phone number (optional): ")
    job_title = input("Enter admin job title (optional): ")
    company = input("Enter admin company (optional): ")
    department = input("Enter admin department (optional): ")
    password = getpass("Enter admin password: ")
    password_confirm = getpass("Confirm admin password: ")

    if password != password_confirm:
        print("Passwords do not match. Exiting.")
        return

    hashed_password = pwd_context.hash(password)

    admin_user = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phone": phone if phone else None,
        "job_title": job_title if job_title else None,
        "company": company if company else None,
        "department": department if department else None,
        "hashed_password": hashed_password,
        "role": "admin"
    }

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        print(f"User with email {email} already exists.")
        return

    result = users_collection.insert_one(admin_user)
    if result.inserted_id:
        print(f"Admin user {firstname} {lastname} created successfully.")
    else:
        print("Failed to create admin user.")

    client.close()

if __name__ == "__main__":
    create_admin()
