from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def greet():
    return {"message": "Discreta says hello!!!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(port=8000, app="main:app", reload=True, host="localhost")
