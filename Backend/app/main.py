from fastapi import FastAPI
from app.api.auth import router as Auth_Router
from app.db.database import engine
from app.db.base import Base

app = FastAPI(title="LifeOS API")
Base.metadata.create_all(bind= engine)
app.include_router(Auth_Router)

@app.get("/")
def root():
    return {"message": "LifeOS Backend Running"}