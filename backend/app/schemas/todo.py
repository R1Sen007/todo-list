from marshmallow import (
    Schema,
    ValidationError,
    fields,
    post_dump,
    post_load,
    pre_load,
    validate,
    EXCLUDE
)
from marshmallow.validate import OneOf

from app.models.todo import TodoStatus
from app.constants import (
    USERNAME_MIN_CHAR,
    USERNAME_MAX_CHAR,
)


class TodoSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(
        required=True,
        validate=[
            validate.Length(min=USERNAME_MIN_CHAR, max=USERNAME_MAX_CHAR)
        ]
    )
    email = fields.Str(
        required=True,
        validate=validate.Email(error='Not a valid email address')
    )
    text = fields.Str(
        required=True
    )
    status = fields.Str(
        validate=OneOf(choices=[member.value for member in TodoStatus])
    )
    edited_by_admin = fields.Bool(
        dump_only=True
    )

    class Meta:
        unknown = EXCLUDE
