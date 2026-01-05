from pydantic import EmailStr

from core.exceptions import BadRequestException
from core.models import User
from core.schemas.auth import AuthRead
from core.schemas.token import Token
from core.schemas.user import UserRead
from core.utils import JWTManager, PasswordManager
from repositories.user import UserRepository
from services import PolarService


class AuthController:
    def __init__(
        self,
        user_repository: UserRepository,
        polar: PolarService,
    ) -> None:
        self.user_repository = user_repository
        self.polar = polar

    async def register(
        self, email: EmailStr, password: str, username: str
    ) -> AuthRead:
        """Register a new user and return authentication tokens."""
        if await self.user_repository.get_by_email(email=email):
            raise BadRequestException("A user with this email already exists.")

        if await self.user_repository.get_by_username(username=username):
            raise BadRequestException("This username is already taken.")

        hashed_password = PasswordManager.hash(password)

        user = await self.user_repository.create(
            {
                "email": email,
                "password": hashed_password,
                "username": username,
            }
        )

        customer = self.polar.register_customer(
            name=user.username, user_id=str(user.id), email=user.email
        )

        # TODO: User Polar ID

        token = self._get_token(user)

        return AuthRead(token=token, user=UserRead.model_validate(user))

    async def login(self, email: str, password: str) -> AuthRead:
        """Authenticate an existing user and return authentication tokens."""
        user = await self.user_repository.get_by_email(email=email)
        if not user:
            raise BadRequestException("Invalid email or password.")

        if not PasswordManager.verify(password, user.password):
            raise BadRequestException("Invalid email or password.")

        token = self._get_token(user)
        return AuthRead(token=token, user=UserRead.model_validate(user))

    def _get_token(self, user: User) -> Token:
        """Generate access and refresh JWT tokens for a user."""
        payload = {"user_id": str(user.id), "email": user.email}

        access_token = JWTManager.encode(payload, token_type="access")
        refresh_token = JWTManager.encode(payload, token_type="refresh")

        return Token(access_token=access_token, refresh_token=refresh_token)
