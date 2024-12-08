from flask import Flask
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

from settings import Config
from app.extensions import db, migrate, jwt
from app.cli import create_first_superuser
from app.api.error_handlers import (
    InvalidAPIUsage,
    handle_exception,
    invalid_api_usage,
)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.url_map.strict_slashes = False
    cors = CORS(app)

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
    app.register_error_handler(
        HTTPException,
        handle_exception,
    )
    return app


app = create_app()
