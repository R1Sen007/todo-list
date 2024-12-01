from http import HTTPStatus

from flask import Blueprint, request

from app.extensions import db
from app.models.todo import Todo
from app.schemas.todo import TodoSchema
from app.api.validators import (
    validate_schema_data
)


todos = Blueprint('todos', __name__)


@todos.post('/')
def post_todo():
    json = request.get_json()
    todo_schema = TodoSchema(dump_only=('status',))
    data = validate_schema_data(json, todo_schema)
    todo = Todo(**data)
    db.session.add(todo)
    db.session.commit()
    db.session.refresh(todo)
    data = todo_schema.dump(todo)
    return data, HTTPStatus.CREATED
