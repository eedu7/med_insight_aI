from core.exceptions import BadRequestException
from core.utils import random_chat_title
from repositories import ScanRepository


class ScanController:
    def __init__(self, scan_repository: ScanRepository):
        self.scan_repository = scan_repository

    async def get_scan_by_id(self, scan_id: str, user_id: str | None = None):
        try:
            return await self.scan_repository.get_scan_by_id(id=scan_id, user_id=user_id)
        except Exception as e:
            raise BadRequestException(str(e))

    async def get_all_scans(self, skip: int = 0, limit: int = 20, user_id: str | None = None):
        try:
            return await self.scan_repository.get_all_scans(skip=skip, limit=limit, user_id=user_id)
        except Exception as e:
            raise BadRequestException(str(e))

    async def create_scan(self, user_id: str, number_of_images: int):
        title = random_chat_title(prefix="scan")
        try:
            return await self.scan_repository.create_scan(
                {"user_id": user_id, "title": title, "number_of_images": number_of_images}
            )
        except Exception as e:
            raise BadRequestException(str(e))

    async def create_scanned_image(
        self,
        file_name: str,
        scan_id: str,
        result: str | None = None,
    ):
        try:
            return await self.scan_repository.create_scanned_image(
                {"file_name": file_name, "result": result, "scan_id": scan_id}
            )
        except Exception as e:
            raise BadRequestException(str(e))
