from datetime import timedelta
from io import BytesIO

from minio import Minio

from core.config import config


class MinioService:
    def __init__(self) -> None:
        self.client = Minio(
            config.MINIO_ENDPOINT,
            config.MINIO_ACCESS_KEY,
            config.MINIO_SECRET_KEY,
            secure=config.MINIO_SECURE,
        )

    def upload_image(self, file_name: str, file_bytes: bytes, content_type: str):
        self.client.put_object(
            bucket_name=config.MINIO_BUCKET_NAME,
            object_name=file_name,
            data=BytesIO(file_bytes),
            length=len(file_bytes),
            content_type=content_type,
        )

    def get_signed_url(self, file_name: str, expiry_seconds: int = 3600) -> str:
        return self.client.presigned_get_object(
            bucket_name=config.MINIO_BUCKET_NAME,
            object_name=file_name,
            expires=timedelta(seconds=expiry_seconds),
        )


_minio_service: MinioService | None = None


def get_minio_service_service() -> MinioService:
    global _minio_service
    if _minio_service is None:
        _minio_service = MinioService()
    return _minio_service
