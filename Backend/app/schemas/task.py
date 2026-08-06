from pydantic import BaseModel
from datetime import datetime

class CreateTask(BaseModel):
    title : str
    description : str | None = None
    priority : str = "Medium"
    due_date : datetime | None = None

class UpdateTask(BaseModel):
    title : str | None =  None
    description : str | None = None
    status : str | None = None
    priority : str | None = None
    due_date : datetime | None = None

class ResponseTask(BaseModel):
    id : int
    title : str
    description : str | None
    status :str
    priority :str
    due_date : datetime | None
    created_at : datetime
    updated_at : datetime
    model_config = {"from_attributes" : True} #Read the values directly from the object's attributes.