from typing import Dict

from openai import OpenAI

from core.config import config


class OpenAIService:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=config.OPENAI_API_KEY)

    def generate_summary(self, result: Dict, model="gpt-5-nano"):
        response = self.client.responses.create(model="gpt-5", input=str(result), instructions="")

        return response.output_text


_openai_service: OpenAIService | None = None


def get_openai_service() -> OpenAIService:
    global _openai_service
    if _openai_service is None:
        _openai_service = OpenAIService()
    return _openai_service
