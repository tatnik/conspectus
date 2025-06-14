# Работа с базами данных в Python

Работа с реляционными базами данных (SQL) — ключевая задача для многих приложений. Python поддерживает множество СУБД: от встроенной SQLite до промышленных PostgreSQL и MySQL, и предлагает высокоуровневые ORM для удобной работы с базами.

---

## Основные СУБД

- **SQLite** — встроенная база данных, не требует отдельного сервера, хранит данные в одном файле, идеально для прототипирования и локальных приложений.
- **PostgreSQL** — мощная, расширяемая, свободная СУБД; поддерживает сложные запросы, транзакции, JSON, расширения.
- **MySQL** — популярная СУБД для веб-приложений, быстрая, надёжная, поддерживает масштабирование.

---

## Работа с SQLite (стандартная библиотека)

```python
import sqlite3

conn = sqlite3.connect("example.db")
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
cur.execute("INSERT INTO users (name) VALUES (?)", ("Alice",))
conn.commit()
cur.execute("SELECT * FROM users")
rows = cur.fetchall()
print(rows)
conn.close()
# [(1, 'Alice')]
```

- Все операции с SQLite идут через стандартный модуль `sqlite3`.
- Для подстановки данных всегда используйте параметры (`?`), чтобы избежать SQL-инъекций.

---

## Работа с PostgreSQL (psycopg2)

```python
import psycopg2

conn = psycopg2.connect(dbname="testdb", user="user", password="secret", host="localhost")
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT)")
cur.execute("INSERT INTO users (name) VALUES (%s)", ("Bob",))
conn.commit()
cur.execute("SELECT * FROM users")
print(cur.fetchall())
conn.close()
# [(1, 'Bob')]
```

- Для PostgreSQL используется сторонний пакет `psycopg2` (или асинхронный `asyncpg`).

---

## Работа с MySQL (mysql-connector-python)

```python
import mysql.connector

conn = mysql.connector.connect(user="root", password="secret", host="localhost", database="testdb")
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100))")
cur.execute("INSERT INTO users (name) VALUES (%s)", ("Carol",))
conn.commit()
cur.execute("SELECT * FROM users")
print(cur.fetchall())
conn.close()
# [(1, 'Carol')]
```

- Для MySQL есть пакет `mysql-connector-python` (или альтернативы: `PyMySQL`, `aiomysql`).

---

## ORM (Object-Relational Mapping)

ORM — это библиотеки, которые позволяют работать с таблицами как с Python-объектами, а не писать SQL вручную. Это упрощает миграции, работу с данными, уменьшает вероятность ошибок.

---

### SQLAlchemy

- Самая мощная и гибкая ORM для Python, поддерживает SQLite, PostgreSQL, MySQL и др.
- Позволяет работать на низком уровне (core) и на высоком (ORM).

**Пример использования SQLAlchemy ORM:**

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)

engine = create_engine("sqlite:///example.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

user = User(name="Dave")
session.add(user)
session.commit()
users = session.query(User).all()
print([(u.id, u.name) for u in users])
session.close()
# [(1, 'Dave')]
```

- Для PostgreSQL: `create_engine("postgresql+psycopg2://user:password@localhost/dbname")`
- Для MySQL: `create_engine("mysql+mysqlconnector://user:password@localhost/dbname")`

---

### peewee

- Лёгкая ORM с простым и лаконичным синтаксисом, поддерживает SQLite, PostgreSQL, MySQL.
- Быстро осваивается, подходит для небольших проектов.

**Пример использования peewee:**

```python
from peewee import Model, CharField, SqliteDatabase

db = SqliteDatabase("example.db")

class User(Model):
    name = CharField()
    class Meta:
        database = db

db.connect()
db.create_tables([User])
user = User.create(name="Eva")
for user in User.select():
    print(user.id, user.name)
db.close()
# 1 Eva
```

---

## Интересные детали и фишки

- ORM позволяют делать миграции схемы через инструменты типа Alembic (для SQLAlchemy).
- В ORM можно использовать фильтрацию, сортировку, объединение таблиц — всё привычно через Python-методы.
- Асинхронные ORM: Tortoise ORM, GINO, SQLModel (FastAPI), поддерживают asyncio.
- Для работы с NoSQL (MongoDB, Redis) есть отдельные библиотеки (`pymongo`, `redis-py`).

---

## Типичные ошибки и подводные камни

- Не закрыли соединение — возникла утечка ресурсов.
- SQL-инъекции при ручной подстановке данных — всегда используйте параметры запроса.
- Несовместимость моделей и базы (например, не совпадает тип поля).
- Забыли выполнить миграцию после изменения модели.
- ORM не всегда эффективна для сложных запросов — иногда выгоднее писать SQL вручную.

---

## Ссылки на документацию и полезные ресурсы

- [sqlite3 (docs)](https://docs.python.org/3/library/sqlite3.html)
- [psycopg2 (PostgreSQL)](https://www.psycopg.org/docs/)
- [mysql-connector-python (MySQL)](https://dev.mysql.com/doc/connector-python/en/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/en/20/orm/)
- [Peewee ORM](https://docs.peewee-orm.com/)
- [Alembic — миграции для SQLAlchemy](https://alembic.sqlalchemy.org/)
