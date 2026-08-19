from sqlalchemy import String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, UTC
from app.db.database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User

class Goal(Base):
    __tablename__ = "goals"

    id : Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
    title : Mapped[str] = mapped_column(String, nullable = False)
    progress : Mapped[int] = mapped_column(Integer, default = 0, nullable = False)
    target_date : Mapped[datetime | None] = mapped_column(DateTime, nullable = True)
    user_id : Mapped[int] = mapped_column(ForeignKey("users.id"), nullable = False)
    user : Mapped["User"] = relationship(back_populates = "goals")