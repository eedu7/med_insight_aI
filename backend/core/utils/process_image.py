from uuid import uuid4

from fastapi import UploadFile

from services import get_openai_service

openai = get_openai_service()


async def process_image(
    file: UploadFile,
    scan_id: str,
    hf_service,
    minio,
    scan_controller,
    model: str,
):
    """Background task to process and save a scanned image"""
    file_name = f"{scan_id}/{uuid4}-{file.filename}"

    scanned_image = await scan_controller.create_scanned_image(file_name=file_name, scan_id=scan_id)

    content = await file.read()

    try:
        hf_result = hf_service.scan(
            image_bytes=content, model=model, content_type=file.content_type or "png"
        )
    except Exception:
        await scan_controller.update_scanned_image(
            scanned_image_id=str(scanned_image.id),
            attributes={"status": "failed"},
        )

    minio.upload_image(file_name, content, file.content_type or "png")
    summary = openai.generate_summary(hf_result)

    try:
        await scan_controller.update_scanned_image(
            scanned_image_id=str(scanned_image.id),
            attributes={"status": "complete", "result": str(summary)},
        )
    except Exception:
        await scan_controller.update_scanned_image(
            scanned_image_id=str(scanned_image.id),
            attributes={"status": "failed"},
        )
