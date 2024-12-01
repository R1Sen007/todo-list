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
from app.constants import (
    USERNAME_MIN_CHAR,
    USERNAME_MAX_CHAR,
    PASSWORD_MIN_CHAR,
    PASSWORD_MAX_CHAR,
)


class UserSchema(Schema):
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
    password = fields.Str(
        required=True,
        load_only=True,
        validate=[
            validate.Length(min=PASSWORD_MIN_CHAR, max=PASSWORD_MAX_CHAR)
        ]
    )

    class Meta:
        unknown = EXCLUDE