from http import HTTPStatus
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from app.models.user import User
from app.schemas.user import UserSchema
from app.api.validators import (
    validate_login_data,
    check_login_data
)


auth = Blueprint('auth', __name__)


@auth.post('/token')
def get_token():
    json = request.get_json()

    user_schema = UserSchema(partial=('username',))
    data = validate_login_data(json, user_schema)
    email = data['email']
    password = data['password']

    user = check_login_data(email, password)
    access_token = create_access_token(identity=user.username)
    return jsonify(access_token=access_token)
