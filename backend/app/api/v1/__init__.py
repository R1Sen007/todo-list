from flask import Blueprint

from app.api.v1.users.routes import users


v1 = Blueprint('v1', __name__)
v1.register_blueprint(users, url_prefix='/users')
