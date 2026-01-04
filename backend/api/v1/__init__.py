from fastapi import APIRouter

from .auth import auth_router
from .scan import scan_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
router.include_router(scan_router, prefix="/scan", tags=["Scan"])
