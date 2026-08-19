from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.task import Task
from app.models.goal import Goal
from app.models.user import User

def get_dashboard(current_user : User, db : Session):
    total_tasks = db.query(Task).filter(Task.user_id == current_user.id).count()
    completed_tasks = db.query(Task).filter(Task.user_id == current_user.id, Task.status == "Completed").count()
    pending_tasks = db.query(Task).filter(Task.user_id == current_user.id, Task.status != "Completed").count()
    total_goals = db.query(Goal).filter(Goal.user_id == current_user.id).count()
    average_goal_progress = db.query(func.avg(Goal.progress)).filter(Goal.user_id == current_user.id).scalar()

    if average_goal_progress is None:
        average_goal_progress = 0.0

    return {"total_tasks" : total_tasks, "completed_tasks" : completed_tasks, "pending_tasks" : pending_tasks, "total_goals" : total_goals, "average_goal_progress" : float(average_goal_progress)}
