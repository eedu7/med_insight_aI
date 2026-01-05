from typing import Dict

from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Chat, ChatMessage


class ChatRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_chat_by_id(self, chat_id: str):
        stmt = select(Chat).where(Chat.id == chat_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all_chats(self, skip: int = 0, limit: int = 20, user_id: str | None = None):
        stmt = select(Chat).offset(skip).limit(limit).order_by(desc(Chat.created_at))
        if user_id:
            stmt.where(Chat.user_id == user_id)
        result = await self.session.execute(stmt)
        return result.scalars().unique().all()

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
