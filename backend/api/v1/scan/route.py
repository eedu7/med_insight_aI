from typing import List
from uuid import uuid4

from fastapi import APIRouter, File, Form, UploadFile

from core.dependencies import HuggingFaceServiceDep, MinioDep
from core.exceptions import BadRequestException

router = APIRouter()


@router.post("/")
async def scan(
    hf_service: HuggingFaceServiceDep,
    minio: MinioDep,
    model: str = Form(...),
    files: List[UploadFile] = File(...),
):
    if not files:
        raise BadRequestException("No files uploaded")
    results = []
    try:
        for file in files:
            content = await file.read()

            if not file.content_type:
                raise ValueError("")

            # hf_result = hf_service.scan(
            #     image_bytes=content, model=model, content_type=file.content_type
            # )

            filename = f"{uuid4()}-{file.filename}"

            minio.upload_image(filename, content, file.content_type)

            signed_url = minio.get_signed_url(filename)

            results.append(
                {
                    "filename": file.filename,
                    "content_type": file.content_type,
                    "size": len(content),
                    "signed_url": signed_url,
                    # "hf_result": hf_result,
                }
            )
        return {
            "status": "success",
            "model": model,
            "file_processed": results,
            "diagnosis": "This is a placeholder diagnosis from FastAPI",
        }
    except Exception as e:
        print(f"Error: {e}")
        raise BadRequestException(str(e))
