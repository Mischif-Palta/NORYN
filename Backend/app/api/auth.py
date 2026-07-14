from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.auth import RegisterRequest
from app.services.auth_service import register_user
from app.schemas.auth import LoginRequest
from app.services.auth_service import login_user
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix= "/auth",
                   tags= ["Authentication"])

@router.post("/register")

def RegisterUser(user : RegisterRequest, db : Session = Depends(get_db)):
    new_user = register_user(user, db)
    return {"messages" : "User Resgistered Successfully!",
            "id" : new_user.id,
            "name" : new_user.name,
            "email" : new_user.email}

@router.post("/login")

def Login(form_data : OAuth2PasswordRequestForm = Depends(), db : Session = Depends(get_db)):
    login_data = LoginRequest(email= form_data.username, password= form_data.password)
    token = login_user(login_data, db)
    return token