from pydantic import BaseModel


class LogoutRequest(BaseModel):
    email: str
    auth_token: str


class LogoutResponse(BaseModel):
    response: str | None
    error: str | None
