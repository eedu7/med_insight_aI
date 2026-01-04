from typing import Annotated

from fastapi import Depends

from services import HuggingFaceService

_hugging_face_service: HuggingFaceService | None = None


def get_hugging_face_service() -> HuggingFaceService:
    global _hugging_face_service
    if _hugging_face_service is None:
        _hugging_face_service = HuggingFaceService()
    return _hugging_face_service


HuggingFaceServiceDep = Annotated[HuggingFaceService, Depends(get_hugging_face_service)]
