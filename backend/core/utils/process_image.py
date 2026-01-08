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
    file_name = f"{scan_id}/{uuid4()}-{file.filename}"
    content_type = file.content_type or "image/png"

    scanned_image = await scan_controller.create_scanned_image(
        file_name=file_name,
        scan_id=scan_id,
    )

    content = await file.read()

    try:
        hf_result = hf_service.scan(
            image_bytes=content,
            model=model,
            content_type=content_type,
        )
    except Exception as e:
        print("HF Model:", str(e))
        await scan_controller.update_scanned_image(
            scanned_image_id=str(scanned_image.id),
            attributes={"status": "failed", "error": str(e)},
        )
        return

    try:
        minio.upload_image(file_name, content, content_type)
    except Exception as e:
        print("Minio:", str(e))

        await scan_controller.update_scanned_image(
            scanned_image_id=str(scanned_image.id),
            attributes={"status": "failed", "error": "upload_failed"},
        )
        return

    try:
        summary = openai.generate_summary(hf_result)
    except Exception as e:
        print("OpenAI:", str(e))

        await scan_controller.update_scanned_image(
            scanned_image_id=str(scanned_image.id),
            attributes={"status": "failed", "error": "summary_failed"},
        )
        return

    await scan_controller.update_scanned_image(
        scanned_image_id=str(scanned_image.id),
        attributes={
            "status": "complete",
            "result": summary,
        },
    )
