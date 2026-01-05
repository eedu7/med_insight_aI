from typing import Dict

from core.exceptions import BadRequestException
from repositories import OrderRepository


class OrderController:
    def __init__(self, order_repository: OrderRepository):
        self.order_repository = order_repository

    async def create(
        self,
        user_id: str,
        product_id: str,
        polar_order_id: str,
    ):
        try:
            return await self.order_repository.create(
                {"user_id": user_id, "product_id": product_id, "polar_order_id": polar_order_id}
            )
        except Exception as e:
            raise BadRequestException(str(e))

    async def update(self, order_id: str, attributes: Dict):
        try:
            updated = await self.order_repository.update(order_id=order_id, attributes=attributes)

            if updated is None:
                raise ValueError("No order found")
            return updated
        except Exception as e:
            raise BadRequestException(str(e))
