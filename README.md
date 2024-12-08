# *Проект todo-list*

## Авторы
 - [Павел Тыртин](https://github.com/R1Sen007)

## Технологии
### backend
 - flask
 - flask-sqalchemy
 - marshmallow
 - flask-jwt-extended
### frontend
 - React
 - react-toolkit
### server
 - gunicorn
 - docker
 - nginx

## Описание:

*Пользователи сервиса могут создавать заметки, а админ редактировать статус и текст заметок*

## Как развернуть проект:

- Клонировать репозиторий
```
git clone https://github.com/R1Sen007/multiple_chat_room.git
```
- Создать .env файл в соответствии с .env.example
- Cоздать образы и запустить контейнеры:
```
cd todo-list
docker compose up --build -d
```
- Провести миграции:
```
docker compose exec backend flask db init
docker compose exec backend flask db migrate -m 'init migration'
docker compose exec backend flask db upgrade
```
- Для доступа к админке создать суперюзера:
```
docker compose exec backend flask create_first_superuser
```
- Ввести в адресной строке браузера "localhost:8000"
