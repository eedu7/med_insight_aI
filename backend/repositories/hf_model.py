from typing import Dict, Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import HFModel


class HFModelRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_all(self, skip: int = 0, limit: int = 10) -> Sequence[HFModel]:
        stmt = select(HFModel).offset(skip).limit(limit)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def create(self, attributes: Dict) -> HFModel:
        hf_model = HFModel(**attributes)
        self.session.add(hf_model)
        await self.session.commit()
        await self.session.refresh(hf_model)
        return hf_model
