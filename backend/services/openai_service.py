from typing import Dict

from openai import OpenAI

from core.config import config

INSTRUCTION_TEXT = """
You are given the output of a Hugging Face inference model or any deep learning model.

Your task is to transform this raw, technical output into a clear, easy-to-understand explanation for users with no technical background.

Requirements:
- Respond strictly in **well-formatted Markdown**
- Use clear headings, bullet points, and short paragraphs
- Avoid technical jargon; if a technical term is necessary, explain it simply
- Clearly explain:
  - What the result means
  - Why it matters to the user
  - Any important confidence scores or predictions in plain language
- Do NOT include raw JSON, code, or model-specific internal details
- The tone should be friendly, concise, and informative

The goal is that a non-technical user can fully understand the result without prior knowledge.

"""


class OpenAIService:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=config.OPENAI_API_KEY)

    def generate_summary(self, result: Dict, model="gpt-5-nano"):
        response = self.client.responses.create(
            model=model,
            input=str(result),
            instructions=INSTRUCTION_TEXT,
        )

        return response.output_text


_openai_service: OpenAIService | None = None


def get_openai_service() -> OpenAIService:
    global _openai_service
    if _openai_service is None:
        _openai_service = OpenAIService()
    return _openai_service
