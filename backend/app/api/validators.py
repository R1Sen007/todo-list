from http import HTTPStatus

from sqlalchemy import select
from marshmallow import ValidationError

from app.api.error_handlers import InvalidAPIUsage
from app.extensions import db
from app.models.user import User


def validate_schema_data(json, schema):
    try:
        data = schema.load(json)
    except ValidationError as err:
        raise InvalidAPIUsage(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            message={"errors": err.messages}
        )
    return data


def validate_login_data(json, user_schema):
    try:
        data = user_schema.load(json)
    except ValidationError as err:
        raise InvalidAPIUsage(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            message={"errors": err.messages}
        )
    return data


def check_login_data(email, password):
    query = select(User)\
            .where(User.email == email)
    user = db.session.execute(query).scalars().first()

    if not user:
        raise InvalidAPIUsage(
            status_code=HTTPStatus.UNAUTHORIZED,
            message='Bad email or Password'
        )
    if not user.check_password(password):
        raise InvalidAPIUsage(
            status_code=HTTPStatus.UNAUTHORIZED,
            message='Bad email or Password'
        )
    return user


def check_username_exists(username):
    query = select(User)\
            .where(User.username == username)
    user = db.session.execute(query).scalars().first()
    if user:
        raise InvalidAPIUsage(
            message='USERNAME ALREADY EXISTS.'
        )


def check_email_exists(email):
    query = select(User)\
            .where(User.email == email)
    user = db.session.execute(query).scalars().first()
    if user:
        raise InvalidAPIUsage(
            message='EMAIL ALREADY EXISTS.'
        )
