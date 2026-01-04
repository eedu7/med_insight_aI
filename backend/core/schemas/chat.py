from typing import List

from pydantic import BaseModel

from .chat_message import ChatMessage


class ChatCreate(BaseModel):
    model: str
    messages: List[ChatMessage]
    stream: bool = True
