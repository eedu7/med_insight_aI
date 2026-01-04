from typing import Annotated

from fastapi import Depends

from services import MinioService, get_minio_service_service

MinioDep = Annotated[MinioService, Depends(get_minio_service_service)]
