import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from database import get_db
from utils import verify_password, get_password_hash, create_access_token, create_refresh_token, decode_access_token
from models import User, Contact
from bson.objectid import ObjectId
from pymongo.errors import DuplicateKeyError

load_dotenv()

app = Flask(__name__)
# Update CORS to allow local dev frontend and deployed frontend origin
CORS(app, origins=["http://localhost:5173", "https://your-vercel-domain.vercel.app"])

db = get_db()
users_collection = db.users
contacts_collection = db.contacts

@app.route('/token', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    if not username or not password:
        return jsonify({"detail": "Missing username or password"}), 400

    user_data = users_collection.find_one({"email": username})
    if not user_data:
        return jsonify({"detail": "Incorrect email or password"}), 401

    # Convert ObjectId to string for Pydantic validation
    user_data['_id'] = str(user_data['_id'])

    user = User(**user_data)
    if not verify_password(password, user.hashed_password):
        return jsonify({"detail": "Incorrect email or password"}), 401

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    })

def token_required(f):
    from functools import wraps
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith("Bearer "):
                token = auth_header[7:]
        if not token:
            return jsonify({"detail": "Token is missing"}), 401
        payload = decode_access_token(token)
        if not payload:
            return jsonify({"detail": "Token is invalid or expired"}), 401
        return f(payload, *args, **kwargs)
    return wraps(f)(decorator)

@app.route('/contacts', methods=['GET'])
@token_required
def get_contacts(payload):
    contacts_cursor = contacts_collection.find()
    contacts = []
    for contact in contacts_cursor:
        contact['_id'] = str(contact['_id'])
        contacts.append(contact)
    return jsonify(contacts)

@app.route('/contacts', methods=['POST'])
@token_required
def create_contact(payload):
    data = request.get_json()
    try:
        result = contacts_collection.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return jsonify(data), 201
    except DuplicateKeyError:
        return jsonify({"detail": "Contact already exists"}), 400

@app.route('/users/me', methods=['GET'])
@token_required
def get_current_user(payload):
    user_email = payload.get('sub')
    if not user_email:
        return jsonify({"detail": "User email not found in token"}), 401
    user_data = users_collection.find_one({"email": user_email})
    if not user_data:
        return jsonify({"detail": "User not found"}), 404
    user_data['_id'] = str(user_data['_id'])
    return jsonify(user_data)

@app.route('/users/me', methods=['PUT'])
@token_required
def update_current_user(payload):
    user_email = payload.get('sub')
    if not user_email:
        return jsonify({"detail": "User email not found in token"}), 401
    update_data = request.get_json()
    if not update_data:
        return jsonify({"detail": "No data provided"}), 400
    # Remove fields that should not be updated directly
    update_data.pop('_id', None)
    update_data.pop('email', None)  # Email change might require special handling
    result = users_collection.update_one({"email": user_email}, {"$set": update_data})
    if result.matched_count == 0:
        return jsonify({"detail": "User not found"}), 404
    user_data = users_collection.find_one({"email": user_email})
    user_data['_id'] = str(user_data['_id'])
    return jsonify(user_data)

@app.route('/token/refresh', methods=['POST'])
def refresh_token():
    data = request.get_json()
    refresh_token = data.get('refresh_token')
    if not refresh_token:
        return jsonify({"detail": "Refresh token missing"}), 400
    payload = decode_access_token(refresh_token)
    if not payload:
        return jsonify({"detail": "Invalid or expired refresh token"}), 401
    user_email = payload.get('sub')
    if not user_email:
        return jsonify({"detail": "Invalid token payload"}), 401
    access_token = create_access_token({"sub": user_email})
    return jsonify({"access_token": access_token, "token_type": "bearer"})

if __name__ == '__main__':
    app.run(debug=True)
