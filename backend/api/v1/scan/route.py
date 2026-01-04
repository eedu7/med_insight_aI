from typing import Annotated, List

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, Request, UploadFile

from controllers import ScanController
from core.dependencies import AuthenticationRequired, HuggingFaceServiceDep, MinioDep
from core.exceptions import BadRequestException
from core.factory import factory
from core.utils import process_image

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])

ScanControllerDep = Annotated[ScanController, Depends(factory.get_scan_controller)]


@router.post("/")
async def scan(
    request: Request,
    background_tasks: BackgroundTasks,
    hf_service: HuggingFaceServiceDep,
    scan_controller: ScanControllerDep,
    minio: MinioDep,
    model: str = Form(...),
    files: List[UploadFile] = File(...),
):
    if not files:
        raise BadRequestException("No files uploaded")

    scan = await scan_controller.create_scan(
        user_id=str(request.state.user.id), number_of_images=len(files)
    )

    for file in files:
        background_tasks.add_task(
            process_image,
            file=file,
            scan_id=str(scan.id),
            hf_service=hf_service,
            minio=minio,
            scan_controller=scan_controller,
            model=model,
        )

    return scan


# @router.post("/")
# async def scan(
#     request: Request,
#     background_tasks: BackgroundTasks,
#     hf_service: HuggingFaceServiceDep,
#     scan_controller: ScanControllerDep,
#     minio: MinioDep,
#     model: str = Form(...),
#     files: List[UploadFile] = File(...),
# ):
#     if not files:
#         raise BadRequestException("No files uploaded")
#     results = []
#     try:
#         for file in files:
#             content = await file.read()

#             if not file.content_type:
#                 raise ValueError("")

#             hf_result = hf_service.scan(
#                 image_bytes=content, model=model, content_type=file.content_type
#             )

#             filename = f"{uuid4()}-{file.filename}"

#             minio.upload_image(filename, content, file.content_type)

#             signed_url = minio.get_signed_url(filename)

#             results.append(
#                 {
#                     "filename": file.filename,
#                     "content_type": file.content_type,
#                     "size": len(content),
#                     "signed_url": signed_url,
#                     "hf_result": hf_result,
#                 }
#             )
#         return {
#             "status": "success",
#             "model": model,
#             "file_processed": results,
#             "diagnosis": "This is a placeholder diagnosis from FastAPI",
#         }
#     except Exception as e:
#         print(f"Error: {e}")
#         raise BadRequestException(str(e))
