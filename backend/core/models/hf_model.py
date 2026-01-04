from sqlalchemy import UUID, Boolean, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from core.database import Base
from core.database.mixins import PrimaryKeyMixin, TimestampMixin


class HFModel(Base, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "hf_models"

    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    hf_model_id: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)
    hf_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    short_description: Mapped[str | None] = mapped_column(String(255), nullable=True)
    full_description: Mapped[str | None] = mapped_column(Text, nullable=True)

    task_type: Mapped[str | None] = mapped_column(String(100), nullable=True)
    medical_domain: Mapped[str | None] = mapped_column(String(100), nullable=True)
    modality: Mapped[str | None] = mapped_column(String(100), nullable=True)

    accuracy: Mapped[float | None] = mapped_column(Float, nullable=True)
    f1_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    auc_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    precision: Mapped[float | None] = mapped_column(Float, nullable=True)
    recall: Mapped[float | None] = mapped_column(Float, nullable=True)

    trained_on_dataset: Mapped[str | None] = mapped_column(String(255), nullable=True)
    dataset_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    architecture: Mapped[str | None] = mapped_column(String(100), nullable=True)
    framework: Mapped[str | None] = mapped_column(String(50), nullable=True)
    parameters_millions: Mapped[str | None] = mapped_column(String(50), nullable=True)

    inference_type: Mapped[str | None] = mapped_column(String(50), nullable=True)
    supports_batch: Mapped[bool] = mapped_column(Boolean, default=False)
    max_input_size: Mapped[int] = mapped_column(Integer, default=1)

    model_version: Mapped[str | None] = mapped_column(String(50), nullable=True)
    revision: Mapped[str | None] = mapped_column(String(50), nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_experimental: Mapped[bool] = mapped_column(Boolean, default=False)

    user_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )
