from fastapi import APIRouter

router = APIRouter()


@router.post("/checkout")
async def create_checkout(): ...
