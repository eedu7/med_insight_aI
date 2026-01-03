from core.exceptions import NotFoundException
from repositories.user import UserRepository


class UserController:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    async def get_by_id(self, id: str):
        user = await self.user_repository.get_by_id(id)

        if not user:
            raise NotFoundException()

        return user
