from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from core.dependencies import HuggingFaceServiceDep
from core.utils.chat import ChatCreate

router = APIRouter()


@router.post("/")
async def chat(data: ChatCreate, hf_service: HuggingFaceServiceDep):
    messages = data.model_dump()
    if data.stream:
        generator = hf_service.text_generation(
            messages=messages["messages"], model=messages["model"], stream=True
        )
        return StreamingResponse(generator, media_type="text/event-stream")  # type: ignore
    return hf_service.text_generation(
        messages=messages["messages"], model=messages["model"], stream=False
    )
