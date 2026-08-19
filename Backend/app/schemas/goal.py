from pydantic import BaseModel
from datetime import datetime

class CreateGoal(BaseModel):
    title : str
    progress : int = 0
    target_date : datetime | None = None

class UpdateGoal(BaseModel):
    title : str | None = None
    progress : int | None = None
    target_date : datetime | None = None

class ResponseGoal(BaseModel):
    id : int
    title : str
    progress : int
    target_date : datetime | None
    user_id : int
    model_config = {"from_attributes" : True}