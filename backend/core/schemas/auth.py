from pydantic import BaseModel

from .token import Token
from .user import UserRead


class AuthRead(BaseModel):
    user: UserRead
    token: Token
