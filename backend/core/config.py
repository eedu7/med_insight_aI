from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    # HuggingFace
    HF_TOKEN: str = ""
    HF_MAX_CONTEXT: int = 2048
    HF_DEFAULT_MAX_TOKENS: int = 512

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

    # Minio
    MINIO_ENDPOINT: str = "localhost:9000"
    MINIO_ACCESS_KEY: str = "minioadmin"
    MINIO_SECRET_KEY: str = "minioadmin123"
    MINIO_BUCKET_NAME: str = "med-insight"
    MINIO_SECURE: bool = False
    MINIO_BUCKET_NAME: str = "med-insight-ai"

    # Polar
    POLAR_ACCESS_TOKEN: str = ""
    POLAR_SERVER: str = "sandbox"
    POLAR_PRODUCT_ID: str = ""
    POLAR_PRODUCT_SLUG: str = ""
    POLAR_ORGANIZATION_ID: str = ""
    POLAR_ORGANIZATION_SLUG: str = ""

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True, extra="ignore"
    )


config = Config()
