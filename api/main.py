from fastapi import FastAPI
from logging import error
import mysql.connector as msql
import os
import dotenv

dotenv.load_dotenv()

user = os.getenv("DB_USER")
if user is None:
    error("No DB_USER environment variable found!")
    exit(1)

password = os.getenv("DB_PASSWORD")
if password is None:
    error("No DB_PASSWORD environment variable found!")
    exit(1)

app = FastAPI()

db = msql.connect(
    user=user,
    password=password,
    host="localhost",
    database="Discreta"
)


@app.get("/")
async def greet():
    return {"message": "Discreta says hello!!!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(port=8000, app="main:app", reload=True, host="localhost")
