from typing import List

from fastapi import FastAPI
from fastapi.middleware import Middleware

from api import router
from core.middlewares.cors import add_cors_middleware


def make_middleware() -> List[Middleware]:
    return [add_cors_middleware()]


def get_app() -> FastAPI:
    app_ = FastAPI(title="MedInsight AI", middleware=make_middleware())
    app_.include_router(router)

    return app_
