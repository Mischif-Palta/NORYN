from sqlalchemy import String, DateTime, Integer, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, UTC
from app.db.database import Base
from __future__ import annotations

class Task(Base):
    __tablename__ = "tasks"
    id : Mapped[int] = mapped_column(Integer, primary_key= True, index= True)
    title : Mapped[str] = mapped_column(String, nullable= False)
    description : Mapped[str | None] = mapped_column(Text, nullable= True)
    status : Mapped[str] = mapped_column(String, default= "Task Pending!", nullable= False)
    priority : Mapped[str] = mapped_column(String, default= "Medium", nullable= False)
    due_date : Mapped[datetime | None] = mapped_column(DateTime, nullable= True)
    created_at : Mapped[datetime] = mapped_column(DateTime, default= lambda: datetime.now(UTC), nullable= False)
    updated_at : Mapped[datetime] = mapped_column(DateTime, default= lambda: datetime.now(UTC), onupdate= lambda: datetime.now(UTC), nullable= False)
    user_id : Mapped[int] = mapped_column(ForeignKey("users.id"), nullable= False)
    user : Mapped["User"] = relationship(back_populates= "tasks")