import uvicorn
import sys
import getpass
from database import engine, SessionLocal
from models import Base, User
from auth_utils import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "runserver":
            print("Starting FastAPI server via manage.py compatibility script...")
            uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
            
        elif command == "createsuperuser":
            print("Creating Superuser...")
            username = input("Username: ")
            email = input("Email: ")
            password = getpass.getpass("Password: ")
            
            db = SessionLocal()
            hashed_password = get_password_hash(password)
            user = User(
                username=username,
                email=email,
                hashed_password=hashed_password,
                is_active=True,
                is_superuser=True
            )
            db.add(user)
            db.commit()
            db.close()
            print(f"Superuser '{username}' created successfully!")
            
        else:
            print(f"Unknown command: {command}")
    else:
        print("Usage: python manage.py [runserver|createsuperuser]")
