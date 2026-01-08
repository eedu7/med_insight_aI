from typing import Dict

from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.models import Scan, ScannedImage


class ScanRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_scan_by_id(self, id: str, user_id: str | None = None):
        stmt = select(Scan).options(selectinload(Scan.scanned_images)).where(Scan.id == id)

        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_scanned_image_by_id(self, id: str):
        stmt = select(ScannedImage).where(ScannedImage.id == id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all_scans(
        self,
        user_id: str | None = None,
        skip: int = 0,
        limit: int = 20,
    ):
        stmt = select(Scan).offset(skip).limit(limit).order_by(desc(Scan.created_at))
        if user_id:
            stmt.where(Scan.user_id == user_id)

        result = await self.session.execute(stmt)
        return result.scalars().unique().all()

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

    async def update_scanned_image(self, obj: ScannedImage, attributes: Dict):
        for key, value in attributes.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        await self.session.commit()
        await self.session.refresh(obj)
        return obj
