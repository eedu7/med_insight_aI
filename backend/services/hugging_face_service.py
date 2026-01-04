from typing import Any, Dict

from huggingface_hub import InferenceClient

from core.config import config


class HuggingFaceService:
    def __init__(self) -> None:
        pass

    def scan(self, image_bytes: bytes, model: str, content_type: str) -> Dict[str, Any]:
        client = InferenceClient(
            provider="hf-inference",
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
            provider="hf-inference",
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

    def text_generation(self, prompt: str, model: str) -> Dict[str, Any]:
        client = InferenceClient(
            provider="hf-inference",
            api_key=config.HF_TOKEN,
        )
        result = client.text_generation(
            prompt=prompt, model=model, max_new_tokens=512, temperature=0.2
        )
        return {"type": "text_generation", "model": model, "output": result}
