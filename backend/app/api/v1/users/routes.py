from flask import Blueprint

from app.models.user import User


users = Blueprint('users', __name__)


@users.get('/')
def users_get():
    return '<h1>Testing the Flask Application Factory Pattern</h1>'
