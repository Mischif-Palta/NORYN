from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.task import CreateTask, ResponseTask
from app.services.task_service import create_task

router = APIRouter(prefix = "/tasks", tags = ["Tasks"])

@router.post("/", response_model = ResponseTask)
def create_new_task(task_data : CreateTask, db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return create_task(task_data, current_user, db)