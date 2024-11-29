from sqlalchemy import String, Boolean
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.extensions import db
from app.constants import (
    USERNAME_MAX_CHAR,
    PASSWORD_HASH_MAX_CHAR,
    EMAIL_MAX_CHAR,
)


class User(db.Model):
    username: Mapped[str] = mapped_column(
        String(USERNAME_MAX_CHAR),
        unique=True,
        nullable=False,
    )
    password: Mapped[str] = mapped_column(
        String(PASSWORD_HASH_MAX_CHAR),
        nullable=False,
    )
    email: Mapped[str] = mapped_column(
        String(EMAIL_MAX_CHAR),
        unique=True,
        nullable=False,
    )
    is_superuser: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    def __repr__(self):
        return f'<User "{self.username}>"'
