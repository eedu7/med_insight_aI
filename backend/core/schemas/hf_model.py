from uuid import UUID

from pydantic import BaseModel, ConfigDict


class HFModelBase(BaseModel):
    display_name: str
    hf_model_id: str
    hf_url: str | None = None

    task_type: str | None = None
    medical_domain: str | None = None
    modality: str | None = None

    accuracy: float | None = None
    f1_score: float | None = None
    auc_score: float | None = None
    precision: float | None = None
    recall: float | None = None

    trained_on_dataset: str | None = None
    dataset_url: str | None = None

    architecture: str | None = None
    framework: str | None = None
    parameters_millions: str | None = None

    inference_type: str | None = None
    supports_batch: bool
    max_input_size: int

    model_version: str | None = None
    revision: str | None = None

    is_active: bool
    is_experimental: bool


class HFModelRead(HFModelBase):
    id: UUID
    user_id: UUID

    model_config = ConfigDict(from_attributes=True)


class HFModelCreate(HFModelBase):
    pass
