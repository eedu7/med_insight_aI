from typing import Annotated

from fastapi import Depends

from services import PolarService, get_polar_service

PolarDep = Annotated[PolarService, Depends(get_polar_service)]
