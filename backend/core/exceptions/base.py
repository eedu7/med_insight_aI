from fastapi import HTTPException, status


class CustomException(HTTPException):
    def __init__(self, message: str | None = None, code: int = status.HTTP_502_BAD_GATEWAY):
        super().__init__(status_code=code, detail=message)


class BadRequestException(CustomException):
    def __init__(self, message: str = "Bad Request"):
        super().__init__(message, code=status.HTTP_400_BAD_REQUEST)


class NotFoundException(CustomException):
    def __init__(self, message: str = "Not Found"):
        super().__init__(message, code=status.HTTP_404_NOT_FOUND)


class ForbiddenException(CustomException):
    def __init__(self, message: str = "Forbidden"):
        super().__init__(message, code=status.HTTP_403_FORBIDDEN)


class UnauthorizedException(CustomException):
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(message, code=status.HTTP_401_UNAUTHORIZED)


class UnprocessableEntityException(CustomException):
    def __init__(self, message: str = "Unprocessable Entity"):
        super().__init__(message, code=status.HTTP_422_UNPROCESSABLE_ENTITY)


class DuplicateValueException(UnprocessableEntityException):
    def __init__(self, message: str = "Duplicate value found"):
        super().__init__(message)
