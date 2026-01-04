from typing import Literal

from core.exceptions import BadRequestException
from core.models import Chat
from core.utils import random_chat_title
from repositories import ChatRepository


class ChatController:
    def __init__(
        self,
        chat_repository: ChatRepository,
    ) -> None:
        self.chat_repository = chat_repository

    async def get_all_chats(self, skip: int = 0, limit: int = 20, user_id: str | None = None):
        try:
            return await self.chat_repository.get_all_chats(skip, limit, user_id)
        except Exception as e:
            raise BadRequestException(str(e))

    async def create_chat(self, user_id: str, title: str) -> Chat:
        try:
            return await self.chat_repository.create_chat({"user_id": user_id, "title": title})
        except Exception as e:
            raise BadRequestException(str(e))

    async def create_chat_message(
        self,
        role: Literal["user", "assistant"],
        content: str,
        user_id: str,
        chat_id: str,
        model_id: str | None = None,
    ):
        if chat_id:
            chat = await self.chat_repository.get_chat_by_id(chat_id)
            if not chat:
                title = random_chat_title()
                chat = await self.create_chat(user_id, title)
                chat_id = str(chat.id)
        try:
            return await self.chat_repository.create_chat_message(
                {"role": role, "content": content, "chat_id": chat_id, "model_id": model_id}
            )
        except Exception as e:
            raise BadRequestException(str(e))
