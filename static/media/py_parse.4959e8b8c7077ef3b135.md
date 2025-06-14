# Сериализация и парсинг данных в Python

**Сериализация** — процесс преобразования объектов Python в строку или байты для хранения или передачи по сети.  
**Парсинг** — разбор структурированных данных из строки/файла в объекты Python.

Python поддерживает разные форматы сериализации: JSON, YAML, XML, pickle. Для валидации и преобразования данных из/в объекты удобно использовать библиотеки marshmallow и pydantic.

---

## Формат JSON (JavaScript Object Notation)

- Самый популярный текстовый формат обмена данными.
- Хорошо поддерживается разными языками, удобен для REST API.

```python
import json

data = {"a": 1, "b": [1, 2, 3]}
# Сериализация (Python → JSON-строка)
json_str = json.dumps(data)
print(json_str)
# {"a": 1, "b": [1, 2, 3]}

# Запись в файл
with open("data.json", "w") as f:
    json.dump(data, f)

# Десериализация (JSON-строка → Python)
parsed = json.loads(json_str)
print(parsed["b"])
# [1, 2, 3]

# Загрузка из файла
with open("data.json") as f:
    loaded = json.load(f)
```

---

## Формат YAML

- Более “человеко-читабельный”, чем JSON, поддерживает комментарии, вложенность, аннотации типов.
- Не входит в стандартную библиотеку, нужен пакет `pyyaml`.

```python
import yaml

data = {"a": 1, "b": [1, 2, 3]}
yaml_str = yaml.dump(data)
print(yaml_str)
# a: 1
# b:
# - 1
# - 2
# - 3

parsed = yaml.safe_load(yaml_str)
print(parsed["a"])
# 1

# Работа с файлами аналогична json
```

---

## Формат XML

- Старейший универсальный формат, используется в сложных системах, конфигурациях, взаимодействии с “тяжёлыми” сервисами.
- Стандартный модуль: `xml.etree.ElementTree`

```python
import xml.etree.ElementTree as ET

root = ET.Element("users")
user = ET.SubElement(root, "user", name="Alice")
ET.SubElement(user, "score").text = "100"
tree = ET.ElementTree(root)
tree.write("users.xml")

# Чтение и парсинг:
tree = ET.parse("users.xml")
root = tree.getroot()
for user in root.findall("user"):
    print(user.attrib["name"], user.find("score").text)
# Alice 100
```

---

## Формат pickle

- Позволяет сохранять и восстанавливать произвольные объекты Python (включая классы, функции, вложенные структуры).
- Не используйте для передачи между недоверенными сторонами (уязвимость к выполнению произвольного кода).

```python
import pickle

data = {"a": 1, "b": [1, 2, 3]}
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

with open("data.pkl", "rb") as f:
    loaded = pickle.load(f)
print(loaded)
# {'a': 1, 'b': [1, 2, 3]}
```

---

## marshmallow

- Библиотека для сериализации, десериализации и валидации сложных структур Python (особенно удобно для web API).
- Описываете схемы (Schema), которые определяют формат, типы и валидацию данных.

```python
from marshmallow import Schema, fields, ValidationError

class UserSchema(Schema):
    name = fields.Str(required=True)
    age = fields.Int(validate=lambda x: 0 < x < 150)

user = {"name": "Ivan", "age": 33}
schema = UserSchema()
# Сериализация: Python → dict
data = schema.dump(user)
print(data)
# {'name': 'Ivan', 'age': 33}

# Валидация и десериализация: dict → Python
try:
    result = schema.load({"name": "Alice", "age": 250})
except ValidationError as err:
    print(err.messages)
# {'age': ['Invalid value.']}
```

---

## pydantic

- Современная библиотека для валидации данных, основана на Python type hints.
- Используется в FastAPI, поддерживает генерацию схем OpenAPI/JSON Schema.

```python
from pydantic import BaseModel, ValidationError

class User(BaseModel):
    name: str
    age: int

user = User(name="Oleg", age=30)
print(user.dict())
# {'name': 'Oleg', 'age': 30}

try:
    u = User(name="Boris", age="abc")
except ValidationError as e:
    print(e)
# 1 validation error for User
# age
#   value is not a valid integer (type=type_error.integer)
```

- Pydantic автоматически конвертирует и валидирует типы, поддерживает вложенные модели, alias, значения по умолчанию.

---

## Интересные детали и фишки

- YAML удобно использовать для конфигов: поддерживает ссылки, многострочные значения, аннотации типов.
- JSON ограничен типами (нет set, tuple, bytes, datetime), для сериализации сложных объектов нужны кастомные энкодеры (`json.JSONEncoder`).
- Pickle быстрый и универсальный, но опасен для передачи между разными машинами/версиями Python.
- marshmallow и pydantic — де-факто стандарт для валидации и “приведения” данных в современных API (особенно pydantic в FastAPI).
- Для быстрой сериализации больших данных (например, DataFrame) часто используют форматы CSV, Parquet, msgpack.

---

## Типичные ошибки и подводные камни

- Забыта сырая строка (r"...") в регулярных выражениях для парсинга.
- Чтение/запись файла в неверной кодировке (используйте utf-8).
- Использование pickle для данных от пользователя — риск безопасности.
- В marshmallow/pydantic: несовпадение типов данных, отсутствие обязательных полей, неочевидные ошибки вложенных схем.

---

## Ссылки на документацию и полезные ресурсы

- [Документация: json](https://docs.python.org/3/library/json.html)
- [Документация: PyYAML](https://pyyaml.org/wiki/PyYAMLDocumentation)
- [Документация: xml.etree.ElementTree](https://docs.python.org/3/library/xml.etree.elementtree.html)
- [pickle — сериализация объектов Python](https://docs.python.org/3/library/pickle.html)
- [marshmallow](https://marshmallow.readthedocs.io/en/stable/)
- [pydantic](https://docs.pydantic.dev/)
