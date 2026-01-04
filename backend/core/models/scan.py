from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy import UUID, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import Base
from core.database.mixins import PrimaryKeyMixin, TimestampMixin

if TYPE_CHECKING:
    from .scanned_image import ScannedImage


class Scan(Base, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "scans"

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(String(50))

    scanned_images: Mapped[List["ScannedImage"]] = relationship(
        "ScannedImage",
        back_populates="scan",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
