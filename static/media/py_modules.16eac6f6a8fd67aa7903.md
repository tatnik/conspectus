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
