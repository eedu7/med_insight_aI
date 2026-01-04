from controllers import AuthController, ChatController, UserController
from controllers.hf_model import HFModelController
from core.dependencies import SessionDep
from repositories import ChatRepository, UserRepository
from services import HuggingFaceService


class Factory:
    """
    Manages the instantiation of repositories and controllers.
    """

    def get_hugging_face_service(self) -> HuggingFaceService:
        return HuggingFaceService()

    def get_user_repository(self, session: SessionDep) -> UserRepository:
        return UserRepository(session=session)

    def get_chat_repository(self, session: SessionDep) -> ChatRepository:
        return ChatRepository(session=session)

    def get_auth_controller(self, session: SessionDep) -> AuthController:
        repo = self.get_user_repository(session)
        return AuthController(repo)

    def get_user_controller(self, session: SessionDep) -> UserController:
        repo = self.get_user_repository(session)
        return UserController(repo)

    def get_hf_model_controller(self, session: SessionDep) -> HFModelController:
        return HFModelController(repo)

    def get_chat_controller(self, session: SessionDep) -> ChatController:
        repo = self.get_chat_repository(session)
        return ChatController(repo)


factory: Factory = Factory()
