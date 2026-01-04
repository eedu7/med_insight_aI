from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from .chat_message import ChatMessage


class ChatCreate(BaseModel):
    model: str
    messages: List[ChatMessage]
    stream: bool = True


class ChatRead(BaseModel):
    id: UUID
    title: str

    model_config = ConfigDict(from_attributes=True)
