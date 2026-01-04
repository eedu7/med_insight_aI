from typing import List

from pydantic import BaseModel

from .scanned_images import ScannedImageRead


class ScanRead(BaseModel):
    title: str
    number_of_images: str
    scanned_images: List[ScannedImageRead]
