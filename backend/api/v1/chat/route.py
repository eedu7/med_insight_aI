from typing import Annotated

from fastapi import APIRouter, Depends, Query, Request
from fastapi.responses import StreamingResponse

from controllers import ChatController
from core.dependencies import AuthenticationRequired, HuggingFaceServiceDep
from core.factory import factory
from core.schemas.chat import ChatCreate
from core.schemas.chat_message import ChatMessageCreate

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])

ChatControllerDep = Annotated[ChatController, Depends(factory.get_chat_controller)]


@router.get("/")
async def get_all_chats(
    request: Request,
    chat_controller: ChatControllerDep,
    skip: Annotated[int, Query()] = 0,
    limit: Annotated[int, Query()] = 20,
):
    return await chat_controller.get_all_chats(skip, limit, request.state.user.id)


@router.post("/")
async def create_chat(data: ChatCreate, hf_service: HuggingFaceServiceDep):
    messages = data.model_dump()
    if data.stream:
        generator = hf_service.text_generation(
            messages=messages["messages"], model=messages["model"], stream=True
        )
        return StreamingResponse(generator, media_type="text/event-stream")  # type: ignore
    return hf_service.text_generation(
        messages=messages["messages"], model=messages["model"], stream=False
    )


@router.post("/message")
async def create_chat_message(
    request: Request,
    data: ChatMessageCreate,
    chat_controller: ChatControllerDep,
    hf: HuggingFaceServiceDep,
    stream: Annotated[bool, Query()] = True,
):
    user_id = request.state.user.id

    # Save User message
    await chat_controller.create_chat_message(
        role="user",
        user_id=user_id,
        content=data.content,
        chat_id=data.chat_id,
        model_id=data.model_id,
    )

    async def stream_generator():
        gen = hf.text_generation(
            messages=[{"role": "user", "content": data.content}],  # type: ignore
            model=data.model_name,
            stream=stream,
        )

        ai_response = []

        for chunk in gen:
            if chunk:
                ai_response.append(chunk.decode("utf-8"))  # type: ignore
                yield chunk.decode("utf-8")  # type: ignore

        content = "".join(ai_response)

        # Save AI Response
        await chat_controller.create_chat_message(
            role="assistant",
            model_id=data.model_id,
            user_id=user_id,
            content=content,
            chat_id=data.chat_id,
        )

    if stream:
        return StreamingResponse(stream_generator(), media_type="text/event-stream")

    result = hf.text_generation(
        messages=[{"role": "user", "content": data.content}],  # type: ignore
        model=data.model_name,
        stream=False,
    )
    # Save AI Response
    await chat_controller.create_chat_message(
        role="assistant",
        model_id=data.model_id,
        user_id=user_id,
        content=(str(result)).decode("utf-8"),  # type: ignore
        chat_id=data.chat_id,
    )
