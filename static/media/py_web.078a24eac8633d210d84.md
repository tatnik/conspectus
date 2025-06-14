# Веб-разработка в Python

Python — один из самых популярных языков для бэкенда. Он поддерживает множество фреймворков для создания веб-приложений, REST API, сайтов и микросервисов. Крупнейшие из них: Flask, FastAPI, Django.

---

## Flask

- Минималистичный микрофреймворк для веб-приложений.
- Простой и гибкий, идеально подходит для небольших API, прототипов, учебных проектов.
- Расширяется плагинами (ORM, аутентификация, миграции и др.).

**Пример простого приложения:**

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/hello")
def hello():
    return "Привет, Flask!"

@app.route("/add", methods=["POST"])
def add():
    data = request.json
    result = data["a"] + data["b"]
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
# curl http://localhost:5000/hello
# → Привет, Flask!
# curl -X POST -H "Content-Type: application/json" -d '{"a": 2, "b": 3}' http://localhost:5000/add
# → {"result": 5}
```

---

## FastAPI

- Современный асинхронный фреймворк, идеально подходит для создания REST API и микросервисов.
- Встроенная поддержка OpenAPI/Swagger-документации, автоматическая валидация входящих данных через pydantic.
- Поддерживает asyncio, высокую производительность, быстрый старт и разработку.

**Пример REST API на FastAPI:**

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    a: int
    b: int

@app.get("/hello")
def hello():
    return {"message": "Привет, FastAPI!"}

@app.post("/add")
def add(item: Item):
    return {"result": item.a + item.b}

# uvicorn main:app --reload
# curl http://localhost:8000/hello
# → {"message": "Привет, FastAPI!"}
# curl -X POST -H "Content-Type: application/json" -d '{"a": 2, "b": 3}' http://localhost:8000/add
# → {"result": 5}
```

- Swagger UI автоматически доступен по адресу http://localhost:8000/docs

---

## Django

- “Тяжёлый” фреймворк для создания полноценных веб-сайтов, порталов, админок и крупных проектов.
- Включает ORM, панель администратора, маршрутизацию, шаблонизаторы, систему аутентификации, миграции и многое другое.
- Следует принципу “одно приложение — много всего из коробки”.

**Пример простого API с Django REST Framework:**

```python
# settings.py, urls.py, models.py, serializers.py, views.py и др.
# Пример самого простого views.py:
from rest_framework.views import APIView
from rest_framework.response import Response

class HelloView(APIView):
    def get(self, request):
        return Response({"message": "Привет, Django!"})

# urls.py:
from django.urls import path
from .views import HelloView

urlpatterns = [
    path("hello/", HelloView.as_view()),
]
# curl http://localhost:8000/hello/
# → {"message": "Привет, Django!"}
```

---

## REST API

- **REST (Representational State Transfer)** — архитектурный стиль для создания web-сервисов.
- Основные принципы: использование HTTP-методов (GET, POST, PUT, DELETE), идентификаторы ресурсов (URI), статeless-взаимодействие, структура "клиент-сервер".
- В Python REST API обычно строят с помощью Flask, FastAPI, Django REST Framework.

**Пример структуры REST API:**

- GET /users — список пользователей
- GET /users/42 — данные пользователя 42
- POST /users — создать нового пользователя
- PUT /users/42 — изменить пользователя 42
- DELETE /users/42 — удалить пользователя 42

**Пример реализации метода GET и POST (Flask):**

```python
from flask import Flask, request, jsonify

app = Flask(__name__)
users = {}

@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)

@app.route("/users", methods=["POST"])
def create_user():
    data = request.json
    user_id = len(users) + 1
    users[user_id] = data
    return jsonify({"id": user_id}), 201
```

---

## Интересные детали и фишки

- FastAPI и Flask подходят для микросервисной архитектуры, Django — для крупных корпоративных систем.
- В FastAPI автоматически документируется API (Swagger, Redoc).
- Во всех фреймворках поддерживаются расширения: JWT-аутентификация, OAuth, миграции, работа с CORS.
- Можно легко запускать тестовые серверы и писать unit-тесты для API.
- Для production рекомендуется использовать серверы типа Gunicorn, Uvicorn (а не встроенный run()).

---

## Типичные ошибки и подводные камни

- Необработанные исключения в endpoint приводят к 500 Internal Server Error.
- Ошибки CORS — забудьте настроить CORS-расширение, и frontend не сможет работать с API.
- Передача больших данных в JSON — возможны проблемы с памятью.
- Неиспользование миграций — поломка БД после изменений моделей.
- Отсутствие аутентификации и валидации — дыра в безопасности.

---

## Ссылки на документацию и полезные ресурсы

- [Flask](https://flask.palletsprojects.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Real Python: Flask vs Django vs FastAPI](https://realpython.com/flask-vs-fastapi-vs-django/)
- [REST API — статья на Хабре](https://habr.com/ru/post/483202/)
