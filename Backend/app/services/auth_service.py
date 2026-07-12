from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.core.security import hash_password

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
    return new_user