from sqlalchemy.orm import Session
from app.models.task import Task
from app.models.user import User
from app.schemas.task import CreateTask, UpdateTask
from fastapi import HTTPException, status

def create_task(task_data : CreateTask, current_user : User, db : Session):
    new_task = Task(title = task_data.title, description = task_data.description, priority = task_data.priority,
                    due_date = task_data.due_date, user_id = current_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task) #gives latest version of the current row
    return new_task

def get_tasks(current_user, db):
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    return tasks

def get_task(task_id, current_user, db):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()

    if task is None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Task not found!")
    
    return task

def update_task(task_id, task_data, current_user, db):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()

    if task is None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Task not found!")

    if task_data.title is not None:
        task.title = task_data.title

    if task_data.description is not None:
            task.description = task_data.description

    if task_data.status is not None:
            task.status = task_data.status

    if task_data.priority is not None:
            task.priority = task_data.priority

    if task_data.due_date is not None:
            task.due_date = task_data.due_date

    db.commit()
    db.refresh(task)
    return task

def delete_task(task_id, current_user, db):
     task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
     if task is None:
          raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Task not found!")
     db.delete(task)
     db.commit()
     return {"message" : "Task deleted successfully!"}