from typing import Annotated, List

from fastapi import APIRouter, Depends, Request, status

from controllers.hf_model import HFModelController
from core.factory import factory
from core.schemas.hf_model import HFModelCreate, HFModelRead

router = APIRouter()

HFModelControllerDep = Annotated[HFModelController, Depends(factory.get_hf_model_controller)]


@router.get("/", response_model=List[HFModelRead])
async def get_all(
    hf_model_controller: HFModelControllerDep,
    skip: int = 0,
    limit: int = 10,
):
    return await hf_model_controller.get_all(skip, limit)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=HFModelRead)
async def create(data: HFModelCreate, request: Request, hf_model_controller: HFModelControllerDep):
    user_id = request.state.user.id
    return await hf_model_controller.create(data.model_dump(), user_id)
