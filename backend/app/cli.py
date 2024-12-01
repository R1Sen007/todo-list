import click
from flask.cli import with_appcontext
from sqlalchemy import inspect, select, or_

from app.extensions import db
from app.models.user import User
from settings import Config


@click.command(name='create_first_superuser')
@with_appcontext
def create_first_superuser():
    inspector = inspect(db.engine)

    if inspector.has_table('user'):
        query = select(User)\
            .where(
                or_(User.email == Config.ADMIN_EMAIL,
                    User.username == Config.ADMIN_USERNAME)
            )
        user = db.session.execute(query).scalars().first()
        if not user:
            user = User(
                username=Config.ADMIN_USERNAME,
                email=Config.ADMIN_EMAIL,
                is_superuser=True
            )
            user.set_password(Config.ADMIN_PASSWORD)
            db.session.add(user)
            db.session.commit()
            print('Superuser created.')
        else:
            print('Superuser already exists.')
    else:
        print('DB or user table not exists.')
