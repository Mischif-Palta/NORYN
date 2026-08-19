from sqlalchemy.orm import Session
from app.models.goal import Goal
from app.models.user import User
from app.schemas.goal import CreateGoal, UpdateGoal
from fastapi import HTTPException, status


def create_goal(goal_data : CreateGoal, current_user : User, db : Session):
    new_goal = Goal(title = goal_data.title, progress = goal_data.progress, target_date = goal_data.target_date, user_id = current_user.id)
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    return new_goal

def get_goals(current_user : User, db : Session):
    goals = db.query(Goal).filter(Goal.user_id == current_user.id).all()
    return goals

def get_goal(goal_id : int, current_user : User, db : Session):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == current_user.id).first()
    if goal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Goal not found!")
    return goal

def update_goal(goal_id : int, goal_data : UpdateGoal, current_user : User, db : Session):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == current_user.id).first()
    if goal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= "Goal not found!")

    if goal_data.title is not None:
        goal.title = goal_data.title
    if goal_data.progress is not None:
        goal.progress = goal_data.progress
    if goal_data.target_date is not None:
        goal.target_date = goal_data.target_date

    db.commit()
    db.refresh(goal)
    return goal

def delete_goal(goal_id : int, current_user : User, db : Session):
    goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == current_user.id).first()
    if goal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Goal not found!")
    db.delete(goal)
    db.commit()
    return {"message" : "Goal successfully deleted!"}