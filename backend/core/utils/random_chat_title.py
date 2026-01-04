import secrets
import string


def random_chat_title(prefix="chat", length=6):
    """Generate a random chat title like 'chat-a1b2c3'"""
    chars = string.ascii_lowercase + string.digits
    rand_str = "".join(secrets.choice(chars) for _ in range(length))
    return f"{prefix}-{rand_str}"
