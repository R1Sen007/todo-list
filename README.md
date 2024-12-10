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
 - Redux-toolkit
### server
 - gunicorn
 - docker
 - nginx

## Описание:

*Пользователи сервиса могут создавать заметки, а админ редактировать статус и текст заметок*
<img width="930" alt="image" src="https://github.com/user-attachments/assets/14230a5a-e0c5-4b81-9813-0ac07ba6a1c2">


## Как развернуть проект:

- Клонировать репозиторий
```
git clone https://github.com/R1Sen007/todo-list.git
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
