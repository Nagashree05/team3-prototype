from hashlib import sha256
from pydantic import BaseModel, field_validator


class SignupRequest(BaseModel):
    auth_token: str
    name: str
    email: str
    password: str

    @field_validator("password", mode="before")
    @classmethod
    def password_before(cls, value: str) -> str:
        return sha256(value.encode("utf-8")).hexdigest()


class SignupResponse(BaseModel):
    stoken: str | None
    response: str | None
    error: str | None
