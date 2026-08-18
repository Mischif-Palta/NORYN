from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.task import CreateTask, ResponseTask, UpdateTask
from app.services.task_service import create_task, get_tasks, get_task, update_task, delete_task

router = APIRouter(prefix = "/tasks", tags = ["Tasks"])

@router.post("/", response_model = ResponseTask)
def create_new_task(task_data : CreateTask, db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return create_task(task_data, current_user, db)

@router.post("/", response_model = list[ResponseTask])
def get_all_tasks(db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return get_tasks(current_user, db)

@router.post("/{task_id}", response_model = ResponseTask)
def get_single_task(task_id: int, db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return get_task(task_id, current_user, db)

@router.put("/{task_id}", response_model = ResponseTask)
def update_existing_task(task_id : int, task_data : UpdateTask ,db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return update_task(task_id, task_data, current_user, db)

@router.delete("/{task_id}")
def delete_existing_task(task_id = int, db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return delete_task(task_id, current_user, db)