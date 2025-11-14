
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
import time
from pymongo.errors import DuplicateKeyError
from app.db.mongo import users_collection
from app.auth.security import hash_pw, verify_pw
from app.auth.security import JWT_SECRET

router = APIRouter()

class User(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(u: User):
    if users_collection.find_one({"email": u.email}):
        raise HTTPException(status_code=400, detail="User exists")
    hashed = hash_pw(u.password)
    try:
        users_collection.insert_one({"email": u.email, "password": hashed})
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="User exists")
    return {"msg": "ok"}

@router.post("/login")
def login(u: User):
    user = users_collection.find_one({"email": u.email})
    if not user or not verify_pw(u.password, user["password"]):
        raise HTTPException(400, "Invalid credentials")
    payload = {"email": u.email, "exp": int(time.time()) + 3600}
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return {"token": token}
