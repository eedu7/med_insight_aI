from typing import Annotated, List, Literal
from uuid import UUID

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, Request, UploadFile, status

from controllers import ScanController
from core.dependencies import AuthenticationRequired, MinioDep
from core.exceptions import BadRequestException
from core.factory import factory
from core.schemas.scan import ScanRead, ScanReadComplete
from core.utils import process_image

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])

ScanControllerDep = Annotated[ScanController, Depends(factory.get_scan_controller)]


@router.get("/", response_model=List[ScanRead])
async def get_all_scans(
    request: Request,
    scan_controller: ScanControllerDep,
    skip: int = 0,
    limit: int = 20,
):
    return await scan_controller.get_all_scans(
        skip=skip, limit=limit, user_id=request.state.user.id
    )


@router.get("/{scan_id}", response_model=ScanReadComplete)
async def get_scan_by_id(
    scan_id: UUID,
    scan_controller: ScanControllerDep,
):
    return await scan_controller.get_scan_by_id(scan_id=str(scan_id))


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ScanRead)
async def scan(
    request: Request,
    background_tasks: BackgroundTasks,
    scan_controller: ScanControllerDep,
    minio: MinioDep,
    model: str = Form(...),
    modelType: Literal["skin", "lung", "colon"] = Form(...),  # make it required
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
            minio=minio,
            scan_controller=scan_controller,
            model=model,
            modelType=modelType,  # pass modelType
        )

    return scan
