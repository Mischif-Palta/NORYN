from fastapi import FastAPI, Depends
from app.api.auth import router as Auth_Router
from app.db.database import engine
from app.db.base import Base
from app.core.dependencies import get_current_user
from app.models.user import User
from app.api.task import router as Task_Router

app = FastAPI(title="LifeOS API")
Base.metadata.create_all(bind= engine)
app.include_router(Auth_Router)
app.include_router(Task_Router)

@app.get("/")
def root():
    return {"message": "LifeOS Backend Running"}

@app.get("/profile")
def get_profile(current_user : User = Depends(get_current_user)):
    return {"id" : current_user.id, "name" : current_user.name, "email" : current_user.email}

