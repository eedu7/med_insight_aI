from collections.abc import Generator
from typing import Any, Dict

from huggingface_hub import InferenceClient
from sqlalchemy.util.typing import TypedDict

from core.config import config


class Message(TypedDict):
    role: str
    content: str


class HuggingFaceService:
    def __init__(self) -> None:
        pass

    def scan(self, image_bytes: bytes, model: str, content_type: str) -> Dict[str, Any]:
        client = InferenceClient(
            api_key=config.HF_TOKEN,
            headers={"Content-Type": content_type},
        )
        try:
            result = client.image_classification(
                image_bytes,
                model=model,
            )

            return {
                "type": "image_classification",
                "model": model,
                "result": result,
                "raw": result,
            }
        except Exception as e:
            raise Exception(str(e))

    def token_classification(self, text: str, model: str) -> Dict[str, Any]:
        client = InferenceClient(
            api_key=config.HF_TOKEN,
        )
        result = client.token_classification(text=text, model=model, aggregation_strategy="simple")

        entities = [
            {
                "entity": item["entity_group"],
                "word": item["word"],
                "score": item["score"],
                "start": item["start"],
                "end": item["end"],
            }
            for item in result
        ]

        return {"type": "token_classification", "model": model, "entities": entities, "raw": result}

    def text_generation(
        self, messages: Dict[str, Any], model: str, stream: bool
    ) -> Generator[bytes | None | None] | str:
        client = InferenceClient(
            api_key=config.HF_TOKEN,
            provider="auto",
        )

        max_tokens = min(config.HF_DEFAULT_MAX_TOKENS, config.HF_MAX_CONTEXT - 32)

        stream_content = client.chat.completions.create(
            model=model,
            messages=messages,  # type: ignore
            stream=True,
            max_tokens=max_tokens,  # type: ignore
        )
        if stream:
            for chunk in stream_content:
                res = chunk.choices[0].delta.content
                if res:
                    yield res.encode("utf-8")
        return stream_content
