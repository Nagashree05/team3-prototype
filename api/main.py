from fastapi import FastAPI, HTTPException
import mysql.connector as msql
import os
import dotenv
from contextlib import asynccontextmanager
from typing import List
from logging import error

from api.consts import STUDENT_TABLE, STUDENT_EMAIL_FIELD, STUDENT_PASSWORD_FIELD
from api.models.login import LoginRequest, LoginResponse
from api.models.student import Student
from api.models.game import Game

dotenv.load_dotenv()

user = os.getenv("DB_USER")
if user is None:
    error("No DB_USER environment variable found!")
    exit(1)

password = os.getenv("DB_PASSWORD")
if password is None:
    error("No DB_PASSWORD environment variable found!")
    exit(1)


@asynccontextmanager
async def get_db_connection():
    connection = msql.connect(
        user=user,
        password=password,
        host="localhost",
        database="Discreta",
        charset="utf8mb4",
        collation="utf8mb4_general_ci",
    )
    try:
        yield connection
    finally:
        connection.close()


async def run_sql_script(script_path: str):
    async with get_db_connection() as db:
        with db.cursor() as cursor:
            with open(script_path, "r") as file:
                sql_script = file.read()
                queries = sql_script.split(";")
                for query in queries:
                    query = query.strip()
                    if query:
                        cursor.execute(query)
                        db.commit()


app = FastAPI()

logged_in_students = set()


@app.on_event("startup")
async def startup():
    create_script_path = os.path.join(os.getcwd(), "db", "1-create.sql")
    insert_script_path = os.path.join(os.getcwd(), "db", "2-insert.sql")
    await run_sql_script(create_script_path)
    await run_sql_script(insert_script_path)


@app.get("/")
async def greet():
    return {"message": "Discreta says hello!!!"}


@app.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    resp = LoginResponse(response=None, error=None)
    async with get_db_connection() as db:
        with db.cursor() as cursor:
            query = f"SELECT * FROM {STUDENT_TABLE} WHERE {STUDENT_EMAIL_FIELD} = '{data.email}' AND {STUDENT_PASSWORD_FIELD} = '{data.password}'"
            cursor.execute(query)
            res = cursor.fetchall()
            if len(res) > 1 or len(res) == 0:
                resp.error = f"No student found with credentials {data.email} authenticated with {data.password} found."
                return resp

    student = Student(email=data.email, password=data.password)
    if student in logged_in_students:
        resp.error = "Student already logged in."
        return resp

    logged_in_students.add(student)
    resp.response = f"Student with credentials {data.email} authenticated with {data.password} logged in."
    return resp


@app.get("/games", response_model=List[Game])
async def get_games():
    async with get_db_connection() as db:
        with db.cursor(dictionary=True) as cursor:
            query = "SELECT * FROM GAMES"
            cursor.execute(query)
            games = cursor.fetchall()
            if not games:
                raise HTTPException(status_code=404, detail="No games found.")
            return games


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(port=8000, app="main:app", reload=True, host="localhost")
