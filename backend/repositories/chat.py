from typing import Dict

from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Chat, ChatMessage


class ChatRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def create_chat(self, attributes: Dict) -> Chat:
        chat = Chat(**attributes)
        self.session.add(chat)
        await self.session.commit()
        await self.session.refresh(chat)
        return chat

    async def create_chat_message(self, attributes: Dict) -> ChatMessage:
        chat_message = ChatMessage(**attributes)
        self.session.add(chat_message)
        await self.session.commit()
        await self.session.refresh(chat_message)
        return chat_message
