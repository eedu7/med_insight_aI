from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Literal

from jose import ExpiredSignatureError, JWTError, jwt

from core.config import config
from core.exceptions import CustomException


class JWTDecodeError(CustomException):
    code = 401
    message = "Invalid token"


class JWTExpiredError(CustomException):
    code = 401
    message = "Token expired"


class JWTManager:
    """
    JWTManager handles encoding and decoding of JWTs with support for access
    and refresh tokens.
    """

    secret_key: str = config.JWT_SECRET
    algorithm: str = config.JWT_ALGORITHM
    access_expire_minutes: int = config.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    refresh_expire_minutes: int = config.JWT_REFRESH_TOKEN_EXPIRE_MINUTES

    @classmethod
    def encode(
        cls,
        payload: Dict[str, Any],
        token_type: Literal["access", "refresh"] = "access",
    ) -> str:
        """
        Encode a payload into a JWT with expiration.
        :param payload: Data to encode
        :param token_type: 'access' or 'refresh'
        :return: JWT token as string
        """
        if token_type == "access":
            expire = datetime.now(timezone.utc) + timedelta(minutes=cls.access_expire_minutes)
        elif token_type == "refresh":
            expire = datetime.now(timezone.utc) + timedelta(minutes=cls.refresh_expire_minutes)
        else:
            raise ValueError("token_type must be 'access' or 'refresh'")

        payload.update({"exp": expire, "type": token_type})
        return jwt.encode(payload, cls.secret_key, algorithm=cls.algorithm)

    @classmethod
    def decode(cls, token: str) -> Dict[str, Any]:
        """
        Decode a JWT and verify its expiration.
        :param token: JWT token
        :return: Decoded payload
        :raises JWTExpiredError: if token has expired
        :raises JWTDecodeError: if token is invalid
        """
        try:
            return jwt.decode(token, cls.secret_key, algorithms=[cls.algorithm])
        except ExpiredSignatureError as e:
            raise JWTExpiredError() from e
        except JWTError as e:
            raise JWTDecodeError() from e

    @classmethod
    def decode_expired(cls, token: str) -> Dict[str, Any]:
        """
        Decode a JWT without checking expiration.
        Useful for token renewal or inspection.
        :param token: JWT token
        :return: Decoded payload
        :raises JWTDecodeError: if token is invalid
        """
        try:
            return jwt.decode(
                token,
                cls.secret_key,
                algorithms=[cls.algorithm],
                options={"verify_exp": False},
            )
        except JWTError as e:
            raise JWTDecodeError() from e

    @classmethod
    def is_refresh_token(cls, payload: Dict[str, Any]) -> bool:
        """
        Check if the decoded payload is a refresh token.
        """
        return payload.get("type") == "refresh"

    @classmethod
    def is_access_token(cls, payload: Dict[str, Any]) -> bool:
        """
        Check if the decoded payload is an access token.
        """
        return payload.get("type") == "access"
