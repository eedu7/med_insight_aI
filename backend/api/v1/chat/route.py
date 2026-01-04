from typing import List

from fastapi import APIRouter
from pydantic import BaseModel

from core.dependencies import HuggingFaceServiceDep

router = APIRouter()


class Message(BaseModel):
    role: str = "user"
    content: str


class ChatRequest(BaseModel):
    model: str
    messages: List[Message]


@router.post("/")
async def chat(data: ChatRequest, hf_service: HuggingFaceServiceDep):
    messages = data.model_dump()
    return hf_service.text_generation(messages=messages["messages"], model=messages["model"])
