from sqlalchemy import UUID, Boolean, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from core.database import Base
from core.database.mixins import PrimaryKeyMixin, TimestampMixin


class HFModel(Base, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "hf_models"

    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    model_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    model_provider: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    model_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    description: Mapped[str | None] = mapped_column(String(255), nullable=True)

    task_type: Mapped[str | None] = mapped_column(
        String(100), nullable=True
    )  # Text, Token, Image Classification, Image Segmentation
    medical_domain: Mapped[str | None] = mapped_column(String(100), nullable=True)

    accuracy: Mapped[float | None] = mapped_column(Float, nullable=True)

    trained_on_dataset: Mapped[str | None] = mapped_column(String(255), nullable=True)
    dataset_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    inference_type: Mapped[str | None] = mapped_column(String(50), nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_experimental: Mapped[bool] = mapped_column(Boolean, default=False)

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )
