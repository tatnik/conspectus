# Декораторы в Python

## Определение

**Декоратор** — это функция, которая принимает другую функцию и возвращает новую функцию (обычно с добавленным поведением).  
Используются для "обёртывания" функций или методов, чтобы изменить или расширить их поведение без изменения исходного кода.

---

## Функции-декораторы

**Простой пример:**

```jsx
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("До вызова функции")
        result = func(*args, **kwargs)
        print("После вызова функции")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Привет!")

say_hello()
# До вызова функции
# Привет!
# После вызова функции
```

---

## Декораторы с параметрами

Иногда требуется, чтобы декоратор принимал параметры. Для этого используют дополнительную функцию-обёртку:

```jsx
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def greet():
    print("Hello!")

greet()
# Hello!
# Hello!
# Hello!
```

---

## Стандартные декораторы

### @staticmethod

- Метод не требует доступа к self или cls.
- Можно вызывать без создания объекта класса.

```jsx
class Math:
    @staticmethod
    def add(a, b):
        return a + b

print(Math.add(2, 3))  # 5
```

### @classmethod

- Метод получает класс как первый аргумент (`cls`), а не объект (`self`).
- Часто используют для альтернативных конструкторов.

```jsx
class Person:
    def __init__(self, name):
        self.name = name

    @classmethod
    def from_str(cls, s):
        return cls(s.capitalize())

p = Person.from_str("анна")
print(p.name)  # Анна
```

### @property

- Превращает метод в "виртуальное" свойство (геттер).
- Можно создавать "ленивые" вычисления и контролировать доступ к данным.

```jsx
class Square:
    def __init__(self, a):
        self._a = a

    @property
    def area(self):
        return self._a ** 2

s = Square(5)
print(s.area)  # 25
```

---

## Сохранение имени и документации функции с помощью functools.wraps

Без использования @functools.wraps, имя и docstring заменяются на имя и документацию внутренней функции-обёртки (wrapper).

```jsx
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """Внутренний враппер-докстринг"""
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def foo():
    """Оригинальный докстринг"""
    pass

print(foo.__name__)      # 'foo'
print(foo.__doc__)       # 'Оригинальный докстринг'
```

---

- Декораторы можно комбинировать (применять несколько сразу).
- Для сохранения имени и документации оригинальной функции удобно использовать `functools.wraps`.
- Можно декорировать не только функции, но и классы.
- Декораторы широко используются во фреймворках (Flask, pytest, Django).

---

**Полезные ссылки:**

- [Документация Python — Декораторы](https://docs.python.org/3/glossary.html#term-decorator)
- [functools.wraps](https://docs.python.org/3/library/functools.html#functools.wraps)

---
