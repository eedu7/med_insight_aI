from uuid import uuid4

from fastapi import UploadFile


async def process_image(
    file: UploadFile,
    scan_id: str,
    hf_service,
    minio,
    scan_controller,
    model: str,
):
    """Background task to process and save a scanned image"""
    # TODO: Update the "ScannedImage" status

    try:
        content = await file.read()

        hf_result = hf_service.scan(
            image_bytes=content, model=model, content_type=file.content_type or "png"
        )

        file_name = f"{scan_id}/{uuid4}-{file.filename}"
        minio.upload_image(file_name, content, file.content_type or "png")

        await scan_controller.create_scanned_image(
            file_name=file_name, result=str(hf_result), scan_id=scan_id
        )
        # TODO: Update the "ScannedImage" status

        print("Results:", hf_result)
    except Exception as e:
        print(f"Failed processing {file.filename}: {e}")
