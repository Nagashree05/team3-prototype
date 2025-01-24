from fastapi import FastAPI
from logging import error
import mysql.connector as msql
import os
import dotenv

from api.consts import STUDENT_TABLE, STUDENT_EMAIL_FIELD, STUDENT_PASSWORD_FIELD
from api.types.login import LoginRequest, LoginResponse
from api.types.student import Student

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

logged_in_students = set()


@app.get("/")
async def greet():
    return {"message": "Discreta says hello!!!"}


@app.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    resp = LoginResponse(response=None, error=None)
    with db.cursor() as cursor:
        query = f"SELECT * FROM {STUDENT_TABLE} WHERE {STUDENT_EMAIL_FIELD} = '{
            data.email}' AND {STUDENT_PASSWORD_FIELD} = '{data.password}'"
        cursor.execute(query)
        res = cursor.fetchall()
        if len(res) > 1 or len(res) == 0:
            resp.error = f"No student found with credentials {
                data.email} authenticated with {data.password} found."
            return resp

    student = Student(email=data.email, password=data.password)
    if student in logged_in_students:
        resp.error = "Student already logged in."
        return resp

    logged_in_students.add(student)
    resp.response = f"Student with credentials {
        data.email} authenticated with {data.password} logged in."
    return resp


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(port=8000, app="main:app", reload=True, host="localhost")
