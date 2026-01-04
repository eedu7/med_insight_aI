from typing import List

from fastapi import APIRouter, File, Form, UploadFile

from core.dependencies import HuggingFaceServiceDep
from core.exceptions import BadRequestException

router = APIRouter()


@router.post("/")
async def scan(
    hf_service: HuggingFaceServiceDep,
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

            hf_result = hf_service.scan(
                image_bytes=content, model=model, content_type=file.content_type
            )

            results.append(
                {
                    "filename": file.filename,
                    "content_type": file.content_type,
                    "size": len(content),
                    "hf_result": hf_result,
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
