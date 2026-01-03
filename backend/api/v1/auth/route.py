from typing import Annotated

from fastapi import APIRouter, Depends, Request, status

from controllers import AuthController, UserController
from core.dependencies import AuthenticationRequired
from core.factory import factory
from core.schemas.auth import AuthCreate, AuthLogin, AuthRead
from core.schemas.user import UserRead

router = APIRouter()

AuthControllerDep = Annotated[AuthController, Depends(factory.get_auth_controller)]


@router.post("/", response_model=AuthRead, status_code=status.HTTP_201_CREATED)
async def register(data: AuthCreate, auth_controller: AuthControllerDep):
    return await auth_controller.register(
        email=data.email, password=data.password, username=data.username
    )


@router.post("/login", response_model=AuthRead, status_code=status.HTTP_201_CREATED)
async def login(data: AuthLogin, auth_controller: AuthControllerDep):
    return await auth_controller.login(email=data.email, password=data.password)


@router.get("/me", response_model=UserRead, dependencies=[Depends(AuthenticationRequired)])
async def user(
    request: Request,
    user_controller: Annotated[UserController, Depends(factory.get_user_controller)],
):
    return await user_controller.get_by_id(request.state.user.id)
