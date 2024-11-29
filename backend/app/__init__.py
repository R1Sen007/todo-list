from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from settings import Config
from app.extensions import db
from app.cli import create_first_superuser


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    migrate = Migrate(app, db)

    from app.api import api
    app.register_blueprint(api, url_prefix='/api')
    app.cli.add_command(create_first_superuser)

    return app
