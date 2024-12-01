from http import HTTPStatus
from flask import Blueprint, request

from app.extensions import db
from app.models.user import User
from app.schemas.user import UserSchema
from app.api.validators import (
    validate_registration_data,
    check_username_exists,
    check_email_exists,
)


users = Blueprint('users', __name__)


@users.post('/')
def register():
    json = request.get_json()

    user_schema = UserSchema()
    data = validate_registration_data(json, user_schema)
    check_username_exists(data['username'])
    check_email_exists(data['email'])

    password = data.pop('password')
    user = User(**data)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    data = user_schema.dump(user)
    return data, HTTPStatus.CREATED
