from flask import Blueprint

from app.api.v1.users.routes import users
from app.api.v1.auth.routes import auth
from app.api.v1.todos.routes import todos


v1 = Blueprint('v1', __name__)
v1.register_blueprint(users, url_prefix='/users')
v1.register_blueprint(auth, url_prefix='/auth')
v1.register_blueprint(todos, url_prefix='/todos')
