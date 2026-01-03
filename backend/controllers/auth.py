from pydantic import EmailStr

from core.exceptions import BadRequestException
from core.models import User
from core.utils import PasswordManager
from repositories.user import UserRepository


class AuthController:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    async def register(self, email: EmailStr, password: str, username: str) -> User:
        if await self.user_repository.get_by_email(email=email):
            raise BadRequestException("Email already exists")

        if await self.user_repository.get_by_username(username=username):
            raise BadRequestException("Username already exists")

        hashed_password = PasswordManager.hash(password)

        return await self.user_repository.create(
            {"email": email, "password": hashed_password, "username": username}
        )
