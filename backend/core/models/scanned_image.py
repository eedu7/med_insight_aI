from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import UUID, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.database import Base
from core.database.mixins import PrimaryKeyMixin, TimestampMixin

if TYPE_CHECKING:
    from .scan import Scan


class ScannedImage(Base, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "scanned_images"

    status: Mapped[str] = mapped_column(String(50), default="loading")
    result: Mapped[str | None] = mapped_column(Text, nullable=True)
    url: Mapped[str] = mapped_column(Text, nullable=False)

    scan_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("scans.id", ondelete="CASCADE"),
        nullable=False,
    )

    scan: Mapped["Scan"] = relationship(
        "Scan",
        back_populates="scanned_images",
    )
