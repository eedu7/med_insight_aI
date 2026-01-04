from uuid import UUID

from pydantic import BaseModel, ConfigDict


class ScannedImageRead(BaseModel):
    id: UUID
    status: str
    file_name: str
    results: str

    model_config = ConfigDict(from_attributes=True)
