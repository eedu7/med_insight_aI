from controllers import (
    AuthController,
    ChatController,
    OrderController,
    ScanController,
    UserController,
)
from controllers.hf_model import HFModelController
from core.dependencies import SessionDep
from repositories import (
    ChatRepository,
    HFModelRepository,
    OrderRepository,
    ScanRepository,
    UserRepository,
)
from services import get_polar_service


class Factory:
    """
    Manages the instantiation of repositories and controllers.
    """

    def get_user_repository(self, session: SessionDep) -> UserRepository:
        return UserRepository(session=session)

    def get_chat_repository(self, session: SessionDep) -> ChatRepository:
        return ChatRepository(session=session)

    def get_hf_model_repository(self, session: SessionDep) -> HFModelRepository:
        return HFModelRepository(session=session)

    def get_scan_repository(self, session: SessionDep) -> ScanRepository:
        return ScanRepository(session=session)

    def get_order_repository(self, session: SessionDep) -> OrderRepository:
        return OrderRepository(session=session)

    def get_auth_controller(self, session: SessionDep) -> AuthController:
        polar = get_polar_service()
        repo = self.get_user_repository(session)
        return AuthController(repo, polar)

    def get_user_controller(self, session: SessionDep) -> UserController:
        repo = self.get_user_repository(session)
        return UserController(repo)

    def get_hf_model_controller(self, session: SessionDep) -> HFModelController:
        repo = self.get_hf_model_repository(session)
        return HFModelController(repo)

    def get_chat_controller(self, session: SessionDep) -> ChatController:
        repo = self.get_chat_repository(session)
        return ChatController(repo)

    def get_scan_controller(self, session: SessionDep) -> ScanController:
        repo = self.get_scan_repository(session)
        return ScanController(repo)

    def get_oder_controller(self, session: SessionDep) -> OrderController:
        repo = self.get_order_repository(session)
        return OrderController(repo)


factory: Factory = Factory()
