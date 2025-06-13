# Модули и пакеты в Python

## Модули

- **Модуль** — это отдельный `.py`-файл, содержащий функции, классы и переменные.
- Модули помогают структурировать код и переиспользовать его в разных проектах.

### Импорт модуля целиком

```jsx
import math
print(math.sqrt(16))  # 4.0
```

### Импорт отдельного объекта из модуля

```jsx
from math import pi, sqrt
print(pi)        # 3.141592653589793
print(sqrt(25))  # 5.0
```

### Импорт с псевдонимом (alias)

```jsx
import datetime as dt
now = dt.datetime.now()
print(now)
```

---

## Свои модули

**Файл `mytools.py`:**

```jsx
def hello():
    print("Привет из модуля!")
```

**Файл `main.py` в той же папке:**

```jsx
import mytools
mytools.hello()  # Привет из модуля!
```

---

## Пакеты

- **Пакет** — папка с модулями и специальным файлом `__init__.py`.
- Позволяет создавать иерархию модулей.

```
myproject/
│
├── main.py
├── utils/
│     ├── __init__.py
│     └── math_tools.py
```

**Пример использования:**

```jsx
from utils import math_tools
```

---

## pip — установка внешних пакетов

- **pip** — стандартная утилита для установки сторонних библиотек из Python Package Index (PyPI).

### Как установить пакет

```bash
pip install requests
```

### Использование установленного пакета

```jsx
import requests

response = requests.get("https://example.com")
print(response.status_code)
```

### Обновление пакета

```bash
pip install --upgrade requests
```

### Просмотр установленных пакетов

```bash
pip list
```

---

- Для каждого проекта рекомендуется использовать виртуальное окружение (`python -m venv venv`).
- Список зависимостей удобно сохранять в файл `requirements.txt` (для команды `pip install -r requirements.txt`).

---

## Как создать свой пакет для публикации на PyPI

### 1. Оформите структуру проекта как пакет

- Папка с уникальным именем (имя будущего пакета).
- Внутри — ваши модули, подпакеты, файл `__init__.py`.
- Обязательны: `pyproject.toml`, часто также `setup.py`, `README.md`, опционально `LICENSE`, `tests/`.

### 2. Опишите метаданные и зависимости

#### Минимальный `pyproject.toml` (современный стандарт, поддерживается pip 21.0+):

```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "my-awesome-package"
version = "0.1.0"
authors = [{name = "Ваше Имя", email = "email@example.com"}]
description = "Описание пакета"
readme = "README.md"
license = {file = "LICENSE"}
dependencies = [
    "requests >=2.20.0"
]
requires-python = ">=3.7"
```

#### Пример простого `setup.py` (для совместимости со старым pip):

```python
from setuptools import setup, find_packages

setup(
    name="my-awesome-package",
    version="0.1.0",
    description="Описание пакета",
    author="Ваше Имя",
    author_email="email@example.com",
    packages=find_packages(),
    install_requires=[
        "requests>=2.20.0"
    ],
    python_requires=">=3.7",
)
```

---

## Публикация пакета на PyPI

1. Зарегистрируйтесь на [PyPI](https://pypi.org/account/register/).
2. Установите необходимые инструменты:

```bash
python -m pip install build twine
```

3. Соберите дистрибутив:

```bash
python -m build
# Появятся файлы dist/my-awesome-package-0.1.0.tar.gz и dist/my-awesome-package-0.1.0-py3-none-any.whl
```

4. Проверьте пакет перед публикацией:

```bash
twine check dist/*
```

5. Опубликуйте пакет на PyPI:

```bash
twine upload dist/*
```

6. Установите свой пакет через pip (после публикации):

```bash
pip install my-awesome-package
```

---

## Интересные детали и советы

- Все зависимости лучше указывать в `pyproject.toml` (или в `install_requires` в setup.py — если делаете старым способом).
- Для приватных (внутренних) пакетов можно использовать собственные PyPI-репозитории или выкладывать архивы вручную.
- Пакет должен иметь уникальное имя, иначе загрузка на PyPI не пройдет.
- Файл `__init__.py` может быть пустым, но он необходим для распознавания директории как пакета (до Python 3.3, после — опционально, но рекомендуется).
- Для автоматической генерации версии удобно использовать [setuptools-scm](https://github.com/pypa/setuptools_scm).

---

## Типичные ошибки и подводные камни

- Отсутствие файла `__init__.py` в структуре пакета.
- Некорректно настроенные пути или ошибка в названии пакета в setup.py/pyproject.toml.
- Забытие добавить нужные файлы (README, LICENSE), что приведёт к ошибкам публикации.
- Публикация тестовой версии пакета в основной PyPI (используйте [TestPyPI](https://test.pypi.org/) для предварительной загрузки).

---

## Ссылки на документацию и полезные ресурсы

- [Packaging Python Projects (официальное руководство)](https://packaging.python.org/tutorials/packaging-projects/)
- [Документация по setuptools](https://setuptools.pypa.io/en/latest/userguide/)
- [pyproject.toml спецификация](https://peps.python.org/pep-0517/)
- [Test PyPI — песочница для публикации пакетов](https://test.pypi.org/)
