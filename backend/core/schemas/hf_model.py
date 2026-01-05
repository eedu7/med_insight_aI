from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class TaskType(StrEnum):
    TEXT = "text"
    CLASSIFICATION = "classification"
    SEGMENTATION = "segmentation"
    TOKEN = "token"


class HFModelBase(BaseModel):
    display_name: str
    model_id: str
    model_provider: str

    model_url: str | None = None

    description: str | None = None

    task_type: TaskType | None = None
    medical_domain: str | None = None

    accuracy: float | None = None

    trained_on_dataset: str | None = None
    dataset_url: str | None = None

    inference_type: str | None = None

    is_active: bool
    is_experimental: bool


class HFModelRead(HFModelBase):
    id: UUID
    user_id: UUID

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class HFModelCreate(BaseModel):
    display_name: str
    model_id: str
    model_provider: str
    is_active: bool = True
    is_experimental: bool = False
