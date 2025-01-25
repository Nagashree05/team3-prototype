import hashlib
from logging import error
import os
from api.main import app
from fastapi.testclient import TestClient
import dotenv

dotenv.load_dotenv()

client = TestClient(app)

auth_token = os.getenv("AUTH_TOKEN")
if auth_token is None:
    error("No AUTH_TOKEN environment variable found!")
    exit(1)


def test_login_valid():
    data = {"auth_token": auth_token,
            "email": "abc@gmail.com", "password": "pqr"}
    hashed_password = hashlib.sha256("pqr".encode("utf-8")).hexdigest()
    res = client.post("/login", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["error"] is None
    assert res_json["response"] is not None
    assert hashed_password in res_json["response"]


def test_login_invalid():
    data = {"auth_token": "",
            "email": "abc@gmail.com", "password": "pqr"}

    res = client.post("/login", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["error"] is not None


def test_logout_invalid():
    data = {"auth_token": auth_token,
            "email": "abc@gmail.com", "password": "pqr"}

    res = client.post("/login", json=data)

    assert res.status_code == 200
    assert res.json()["error"] is None

    data = {"auth_token": "", "email": "abc@gmail.com"}

    res = client.post("/logout", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["error"] is not None
