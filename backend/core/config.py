from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    # Database
    DATABASE_URL: str = ""

    # Redis
    REDIS_URL: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True, extra="ignore"
    )


config = Config()
