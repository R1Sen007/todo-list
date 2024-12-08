from http import HTTPStatus

from flask import Blueprint, request
from flask_jwt_extended import jwt_required, current_user
from sqlalchemy.sql import text

from app.extensions import db
from app.models.todo import Todo
from app.schemas.todo import TodoSchema
from app.api.validators import (
    validate_schema_data,
    check_admin_role,
    validate_order_params,
)
from app.api.utils import check_todo_text_has_changed
from app.constants import (
    DEFAULT_PAGE,
    DEFAULT_PER_PAGE,
    AVAILABLE_COLUMNS_TO_ORDER,
)


todos = Blueprint('todos', __name__)


@todos.get('')
def get_todos():
    # print(request.headers)
    page = request.args.get("page", DEFAULT_PAGE, type=int)
    per_page = request.args.get("per-page", DEFAULT_PER_PAGE, type=int)
    order = request.args.get("order", AVAILABLE_COLUMNS_TO_ORDER[0], type=str)

    order, direction = validate_order_params(order)
    # print(f'{order} {direction}')
    todos = (
        Todo.query
        .order_by(text(f'{order} {direction}'))
        .paginate(page=page, per_page=per_page)
    )
    todo_schema = TodoSchema(many=True)
    objects = todo_schema.dump(todos)

    results = {
        'results': objects,
        'pagination': {
            'count': todos.total,
            'page': page,
            'per_page': per_page,
            'pages': todos.pages
        }
    }
    return results, HTTPStatus.OK


@todos.get('/<int:todo_id>')
def get_todo(todo_id):
    todo = db.get_or_404(Todo, todo_id)
    todo_schema = TodoSchema()
    result = todo_schema.dump(todo)
    return result, HTTPStatus.OK


@todos.post('')
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


@todos.patch('/<int:todo_id>')
@jwt_required()
def put_todo(todo_id):
    check_admin_role(current_user.is_superuser)
    todo = db.get_or_404(Todo, todo_id)
    json = request.get_json()
    todo_schema = TodoSchema(dump_only=('username', 'email'))
    data = validate_schema_data(json, todo_schema)
    has_changed = check_todo_text_has_changed(todo.text, data['text'])
    if has_changed:
        todo.text = data['text']
        todo.edited_by_admin = True
    todo.status = data['status']

    db.session.add(todo)
    db.session.commit()
    db.session.refresh(todo)
    result = todo_schema.dump(todo)

    return result, HTTPStatus.ACCEPTED
