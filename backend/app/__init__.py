from flask import Flask

from settings import Config
from app.extensions import db, migrate, jwt
from app.cli import create_first_superuser
from app.api.error_handlers import (
    InvalidAPIUsage,
    invalid_api_usage
)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from app.api import api
    app.register_blueprint(api, url_prefix='/api')
    app.cli.add_command(create_first_superuser)

    app.register_error_handler(
        InvalidAPIUsage,
        invalid_api_usage,
    )
    return app
