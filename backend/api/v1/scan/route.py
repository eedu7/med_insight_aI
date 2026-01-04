from typing import List

from fastapi import APIRouter, File, Form, UploadFile

from core.exceptions import BadRequestException

router = APIRouter()


@router.post("/")
async def scan(scanType: str = Form(...), files: List[UploadFile] = File(...)):
    if not files:
        raise BadRequestException("No files uploaded")
    results = []
    try:
        for file in files:
            content = await file.read()

            results.append(
                {"filename": file.filename, "content_type": file.content_type, "size": len(content)}
            )
        return {
            "status": "success",
            "scan_type": scanType,
            "file_processed": results,
            "diagnosis": "This is a placeholder diagnosis from FastAPI",
        }
    except Exception as e:
        print(f"Error: {e}")
        raise BadRequestException()
