from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import UUID, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import Base
from core.database.mixins import PrimaryKeyMixin, TimestampMixin

if TYPE_CHECKING:
    from .chat import Chat


class ChatMessage(Base, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "chat_message"

    status: Mapped[str] = mapped_column(String(50), default="loading")
    role: Mapped[str] = mapped_column(String(50), default="user")

    content: Mapped[str] = mapped_column(Text)

    model_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("hf_models.id"), nullable=True
    )
    chat_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("chats.id"))

    chat: Mapped["Chat"] = relationship("Chat", back_populates="messages")
