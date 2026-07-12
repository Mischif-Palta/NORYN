from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.auth import RegisterRequest
from app.services.auth_service import register_user

router = APIRouter(prefix= "/auth",
                   tags= ["Authentication"])

@router.post("/register")

def RegisterUser(user : RegisterRequest, db : Session = Depends(get_db)):
    new_user = register_user(user, db)
    return {"messages" : "User Resgistered Successfully!",
            "id" : new_user.id,
            "name" : new_user.name,
            "email" : new_user.email}
