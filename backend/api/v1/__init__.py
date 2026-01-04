from fastapi import APIRouter

from .auth import auth_router
from .hf_model import hf_model_router
from .scan import scan_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
router.include_router(scan_router, prefix="/scan", tags=["Scan"])
router.include_router(hf_model_router, prefix="/hf-model", tags=["HuggingFace Models"])
