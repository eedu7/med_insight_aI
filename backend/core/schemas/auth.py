from pydantic import BaseModel, EmailStr, Field

from .token import Token
from .user import UserRead


class AuthRead(BaseModel):
    user: UserRead = Field(..., description="Authenticated user details")
    token: Token = Field(..., description="Access and refresh token pair")


class AuthCreate(BaseModel):
    username: str = Field(..., description="User's display name", examples=["John Doe"])
    email: EmailStr = Field(
        ..., description="User's email address", examples=["john.doe@gmail.com"]
    )
    password: str = Field(
        ..., description="User's password (plain text, will be hashed)", examples=["Password@123"]
    )


class AuthLogin(BaseModel):
    email: EmailStr = Field(
        ..., description="Registered user email address", examples=["john.doe@gmail.com"]
    )
    password: str = Field(..., description="User account password", examples=["Password@123"])
