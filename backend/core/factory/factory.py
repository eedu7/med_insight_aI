from controllers import AuthController, UserController
from core.dependencies import SessionDep
from repositories import UserRepository


class Factory:
    """
    Manages the instantiation of repositories and controllers.
    """

    def get_user_repository(self, session: SessionDep):
        return UserRepository(session=session)

    def get_auth_controller(self, session: SessionDep) -> AuthController:
        repo = self.get_user_repository(session)
        return AuthController(repo)

    def get_user_controller(self, session: SessionDep) -> UserController:
        repo = self.get_user_repository(session)
        return UserController(repo)
