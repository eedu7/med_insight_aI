from fastapi import FastAPI

from api import router


def get_app() -> FastAPI:
    app_ = FastAPI(title="MedInsight AI")
    app_.include_router(router)

    return app_
