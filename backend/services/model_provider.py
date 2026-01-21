from collections.abc import Generator
from typing import Any, Dict, Literal

import requests


class ModelProvider:
    def __init__(self, base_url: str = "http://localhost:8080"):
        self.base_url = base_url

    def scan(self, image_bytes: bytes, modelType: Literal['skin', 'lung', 'colon'], content_type: str) -> Dict[str, Any]:
        """
        Upload image bytes to local inference API and return predictions.

        Args:
            image_bytes (bytes): Image content bytes.
            model (str): Either "skin" or "colon-lung" (based on your endpoints).
            content_type (str): e.g. "image/jpeg" or "image/png"

        Returns:
            Dict[str, Any]: Prediction response
        """
        # Decide endpoint based on model name
        if "skin" in modelType.lower():
            url = f"{self.base_url}/skin-cancer"
        elif "colon" in modelType.lower() or "lung" in modelType.lower():
            url = f"{self.base_url}/colon-lung-cancer"
        else:
            return {"error": "Invalid model type. Use 'skin' or 'colon-lung'."}

        files = {"file": ("image.jpg", image_bytes, content_type)}

        try:
            response = requests.post(url, files=files)

            if response.status_code != 200:
                return {
                    "error": "Request failed",
                    "status_code": response.status_code,
                    "detail": response.text,
                }

            return response.json()

        except Exception as e:
            return {"error": str(e)}

    def text_generation(
        self, messages: Dict[str, Any], model: str, stream: bool
    ) -> Generator[bytes | None | None] | str:
        for i in range(100):
            yield i
