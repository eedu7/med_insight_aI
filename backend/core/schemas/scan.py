from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from .scanned_images import ScannedImageRead


class ScanReadComplete(BaseModel):
    id: UUID
    title: str
    number_of_images: int
    scanned_images: List[ScannedImageRead]

    model_config = ConfigDict(from_attributes=True)


class ScanRead(BaseModel):
    id: UUID
    title: str
    model_config = ConfigDict(from_attributes=True)
