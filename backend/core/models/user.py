from sqlalchemy import UUID, String
from sqlalchemy.orm import Mapped, mapped_column

from core.database import Base
from core.database.mixins import PrimaryKeyMixin, TimestampMixin


class User(Base, PrimaryKeyMixin, TimestampMixin):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password: Mapped[str] = mapped_column(String(255))

    polar_customer_id: Mapped[UUID | None] = mapped_column(
        UUID(as_uuid=True), unique=True, index=True, nullable=True
    )
