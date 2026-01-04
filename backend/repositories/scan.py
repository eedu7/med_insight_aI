from typing import Dict

from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Scan, ScannedImage


class ScanRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_scan(self, attributes: Dict) -> Scan:
        scan = Scan(**attributes)
        self.session.add(scan)
        await self.session.commit()
        await self.session.refresh(scan)
        return scan

    async def create_scanned_image(self, attributes: Dict) -> ScannedImage:
        scanned_image = ScannedImage(**attributes)
        self.session.add(scanned_image)
        await self.session.commit()
        await self.session.refresh(scanned_image)
        return scanned_image
