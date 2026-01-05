from uuid import UUID

from pydantic import BaseModel


class ChatMessage(BaseModel):
    id: UUID
    role: str = "user"
    content: str


class ChatMessageCreate(BaseModel):
    chat_id: str
    model_name: str
    model_id: str
    role: str
    content: str
