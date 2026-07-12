from app.db.database import session_local

def get_db(): # Opening and closing DB
    db =  session_local()
    try:
        yield db
    finally:
        db.close()
