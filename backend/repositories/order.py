from typing import Dict

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Order


class OrderRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create(self, attributes: Dict) -> Order:
        order = Order(**attributes)
        self.session.add(order)
        await self.session.commit()
        await self.session.refresh(order)
        return order

    async def update(self, order_id: str, attributes: Dict) -> Order | None:
        result = await self.session.execute(select(Order).where(Order.id == order_id))
        order: Order | None = result.scalar_one_or_none()

        if not order:
            return None

        for key, value in attributes.items():
            if hasattr(order, key):
                setattr(order, key, value)

        await self.session.commit()
        await self.session.refresh(order)
        return order
