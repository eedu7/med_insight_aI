from typing import cast

from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from core.config import config


def add_cors_middleware() -> Middleware:
    """
    Adds CORS middleware to the FastAPI.
    """
    origins = config.CORS_ORIGINS
    origins = [origin.strip() for origin in origins.split(",") if origin]

    return Middleware(
        cast(type, CORSMiddleware),
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
