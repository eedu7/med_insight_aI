from typing import Any, Dict

from huggingface_hub import InferenceClient

from core.config import config


class HuggingFaceService:
    def __init__(self) -> None:
        self.client = InferenceClient(provider="hf-inference", api_key=config.HF_TOKEN)

    def scan(self, image: bytes, model: str) -> Dict[str, Any]:
        result = self.client.image_classification(image=image, model=model)

        predictions = [
            {"label": item["label"], "score": round(item["score"], 4)} for item in result
        ]

        return {
            "type": "image_classification",
            "model": model,
            "predictions": predictions,
            "raw": result,
        }

    def token_classification(self, text: str, model: str) -> Dict[str, Any]:
        result = self.client.token_classification(
            text=text, model=model, aggregation_strategy="simple"
        )

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
        result = self.client.text_generation(
            prompt=prompt, model=model, max_new_tokens=512, temperature=0.2
        )
        return {"type": "text_generation", "model": model, "output": result}
