from uuid import UUID

from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from core.exceptions import UnauthorizedException
from core.schemas.current_user import CurrentUser
from core.utils import JWTManager


class AuthenticationRequired:
    def __init__(
        self,
        request: Request,
        token: HTTPAuthorizationCredentials = Depends(HTTPBearer(auto_error=False)),
    ):
        if not token:
            raise UnauthorizedException("Authorization token missing")

        try:
            payload = JWTManager.decode(token.credentials)

            user_id_str = payload.get("user_id")
            if not user_id_str:
                raise UnauthorizedException("Invalid token payload")

            user_id = UUID(user_id_str)

            if not hasattr(request.state, "user"):
                request.state.user = CurrentUser()

            request.state.user.id = user_id

        except Exception:
            raise UnauthorizedException("Invalid or expired token")
