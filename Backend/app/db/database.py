from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase, session
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}) # Connects to DB
session_local = sessionmaker(autocommit= False, autoflush= False, bind= engine) # Working of DB

class Base(DeclarativeBase):
    pass

def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()