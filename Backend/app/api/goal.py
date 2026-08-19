from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.goal import CreateGoal, ResponseGoal, UpdateGoal
from app.services.goal_service import create_goal, get_goals, get_goal, update_goal, delete_goal


router = APIRouter(prefix="/goals", tags=["Goals"])


@router.post("/", response_model=ResponseGoal)
def create_new_goal(goal_data: CreateGoal, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_goal(goal_data, current_user, db)

@router.get("/", response_model=list[ResponseGoal])
def get_all_goals(db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return get_goals(current_user, db)

@router.get("/{goal_id}", response_model=ResponseGoal)
def get_single_goal(goal_id : int, db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return get_goal(goal_id, current_user, db)

@router.put("/{goal_id}", response_model=ResponseGoal)
def update_existing_goal(goal_id : int, goal_data : UpdateGoal, db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return update_goal(goal_id, goal_data, current_user, db)

@router.delete("/{goal_id}")
def delete_existing_goal(goal_id : int, db : Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return delete_goal(goal_id, current_user, db)
