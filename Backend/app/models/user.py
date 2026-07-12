from sqlalchemy import String, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime, UTC
from app.db.database import Base

class User(Base):
    __tablename__ = "users"
    id : Mapped[int] = mapped_column(Integer, primary_key= True, index= True) # ID of user
    name : Mapped[str] = mapped_column(String, nullable= False) # Name of user
    email : Mapped[str] = mapped_column(String, unique= True, nullable= False) # Email
    password_hash : Mapped[str] = mapped_column(String, nullable= False) # Hash version of pswd
    created_at : Mapped[datetime] = mapped_column(DateTime, default= lambda: datetime.now(UTC)) # Time and Date os record creation
