from fastapi import FastAPI, Depends
from app.api.auth import router as Auth_Router
from app.db.database import engine
from app.db.base import Base
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.goal import Goal
from app.models.task import Task
from app.api.task import router as Task_Router
from app.api.goal import router as Goal_Router
from app.api.dashboard import router as Dashboard_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LifeOS API")
Base.metadata.create_all(bind= engine)
app.include_router(Auth_Router)
app.include_router(Task_Router)
app.include_router(Goal_Router)
app.include_router(Dashboard_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "LifeOS Backend Running"}

@app.get("/profile")
def get_profile(current_user : User = Depends(get_current_user)):
    return {"id" : current_user.id, "name" : current_user.name, "email" : current_user.email}

