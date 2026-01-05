from polar_sdk import Polar

from core.config import config


class PolarService:
    def __init__(self) -> None:
        self.client = Polar(
            server=config.POLAR_SERVER,
            access_token=config.POLAR_ACCESS_TOKEN,
        )


_polar_service: PolarService | None = None


def get_polar_service() -> PolarService:
    global _polar_service
    if _polar_service is None:
        _polar_service = PolarService()
    return _polar_service
