# User model
USERNAME_MIN_CHAR = 4
USERNAME_MAX_CHAR = 20
PASSWORD_MIN_CHAR = 3
PASSWORD_MAX_CHAR = 36
PASSWORD_HASH_MAX_CHAR = 256
EMAIL_MAX_CHAR = 120

# Pagination settings
DEFAULT_PAGE = 1
DEFAULT_PER_PAGE = 3
AVAILABLE_COLUMNS_TO_ORDER = (
    'id',
    'username',
    'email',
    'status',
)
