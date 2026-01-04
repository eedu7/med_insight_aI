from typing import Dict

from core.exceptions import BadRequestException
from core.models import HFModel
from repositories import HFModelRepository


class HFModelController:
    def __init__(self, hf_model_repository: HFModelRepository) -> None:
        self.hf_model_repository = hf_model_repository

    async def get_all(self, skip: int = 0, limit: int = 10):
        try:
            return await self.hf_model_repository.get_all(skip, limit)
        except Exception as e:
            raise BadRequestException(str(e))

    async def create(self, attributes: Dict, user_id: str) -> HFModel:
        attributes.update({"user_id": user_id})
        try:
            return await self.hf_model_repository.create(attributes)
        except Exception as e:
            raise BadRequestException(str(e))
