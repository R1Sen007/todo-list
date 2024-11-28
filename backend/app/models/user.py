from sqlalchemy import String
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)

from app.extensions import db


class User(db.Model):
    username: Mapped[str] = mapped_column(String(64), index=True, unique=True)

    def __repr__(self):
        return f'<User "{self.username}>"'
