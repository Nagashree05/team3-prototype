import hashlib
from api.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_login():
    data = {"email": "abc@gmail.com", "password": "pqr"}
    resp_data = {
        "response": f"Student with credentials abc@gmail.com authenticated with {
            hashlib.sha256(data["password"].encode("utf-8")).hexdigest()} logged in.",
        "error": None
    }

    res = client.post("/login", json=data)

    assert res.status_code == 200
    assert res.json()["error"] is None
    assert res.json() == resp_data
