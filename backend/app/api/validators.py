from http import HTTPStatus

from sqlalchemy import select
from marshmallow import ValidationError

from app.api.error_handlers import InvalidAPIUsage
from app.extensions import db
from app.models.user import User


def validate_registration_data(json, user_schema):
    try:
        data = user_schema.load(json)
    except ValidationError as err:
        raise InvalidAPIUsage(
            status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
            message={"errors": err.messages}
        )
    return data


def check_username_exists(username):
    query = select(User)\
            .where(User.username == username)
    user = db.session.execute(query).first()
    if user:
        raise InvalidAPIUsage(
            message='USERNAME ALREADY EXISTS.'
        )


def check_email_exists(email):
    query = select(User)\
            .where(User.email == email)
    user = db.session.execute(query).first()
    if user:
        raise InvalidAPIUsage(
            message='EMAIL ALREADY EXISTS.'
        )
