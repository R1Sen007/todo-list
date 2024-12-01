import enum

from sqlalchemy import String, Boolean, Text, Enum
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.extensions import db
from app.constants import (
    USERNAME_MAX_CHAR,
    EMAIL_MAX_CHAR,
)


class TodoStatus(enum.Enum):
    ACTIVE = 'active'
    FINISHED = 'finished'


class Todo(db.Model):
    username: Mapped[str] = mapped_column(
        String(USERNAME_MAX_CHAR),
        nullable=False,
    )
    email: Mapped[str] = mapped_column(
        String(EMAIL_MAX_CHAR),
        nullable=False,
    )
    text: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )
    status: Mapped[str] = mapped_column(
        Enum(TodoStatus).values_callable,
        default=TodoStatus.ACTIVE.value
    )
    edited_by_admin: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    def __repr__(self):
        return f'<Todo "{self.id}>"'
