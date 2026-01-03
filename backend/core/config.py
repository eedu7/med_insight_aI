from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    # JWT
    JWT_SECRET: str = ""
    JWT_ALGORITHM: str = ""
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    # Database
    DATABASE_URL: str = ""

    # Redis
    REDIS_URL: str = ""

    # CORS
    CORS_ORIGINS: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True, extra="ignore"
    )


config = Config()
