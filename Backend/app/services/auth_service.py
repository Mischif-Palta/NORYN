from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import hash_password, verify_password
from app.core.jwt_handler import create_access_token

def register_user(user : RegisterRequest, db : Session):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise ValueError("Email Already Registered!")
    new_user = User(name = user.name,
                    email = user.email,
                    password_hash = hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return 

def login_user(user : LoginRequest, db : Session):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise ValueError("Invalid Email or Password!")
    if not verify_password(user.password, db_user.password_hash):
        raise ValueError("Invalid Email or Password!")
    
    access_token = create_access_token(data = {"sub" : str(db_user.id)})
    return {"access_token" : access_token, "token_type" : "bearer"}