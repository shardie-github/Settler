"""
Settler Python SDK Exceptions
"""


class SettlerError(Exception):
    """Base exception for all Settler errors"""
    
    def __init__(self, message: str, status_code: int = 0):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class NetworkError(SettlerError):
    """Network-related errors (timeout, connection, etc.)"""
    pass


class AuthenticationError(SettlerError):
    """Authentication errors (invalid API key, expired token, etc.)"""
    pass


class ValidationError(SettlerError):
    """Validation errors (invalid input, missing fields, etc.)"""
    pass


class NotFoundError(SettlerError):
    """Resource not found errors"""
    pass


class RateLimitError(SettlerError):
    """Rate limit exceeded errors"""
    pass


class ServerError(SettlerError):
    """Server errors (5xx)"""
    pass
