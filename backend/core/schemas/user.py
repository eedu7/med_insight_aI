from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UserRead(BaseModel):
    id: UUID
    email: str
    username: str

    model_config = ConfigDict(from_attributes=True)
