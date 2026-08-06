from sqlalchemy.orm import Session
from app.models.task import Task
from app.models.user import User
from app.schemas.task import CreateTask, UpdateTask

def create_task(task_data : CreateTask, current_user : User, db : Session):
    new_task = Task(title = task_data.title, description = task_data.description, priority = task_data.priority,
                    due_date = task_data.due_date, user_id = current_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task) #gives latest version of the current row
    return new_task

