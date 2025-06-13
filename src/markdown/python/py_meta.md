````markdown
# Метапрограммирование в Python

**Метапрограммирование** — подход, при котором программы могут анализировать, изменять или создавать другой код во время выполнения. Python благодаря своей динамической природе отлично подходит для метапрограммирования: функции — объекты первого класса, классы и их атрибуты можно создавать и модифицировать "на лету".

---

## Работа с функциями как с объектами

- В Python функции — это полноценные объекты: их можно присваивать переменным, хранить в коллекциях, передавать как аргументы, возвращать из других функций.

```python
def greet(name):
    return f"Привет, {name}!"

f = greet  # Сохраняем ссылку на функцию
print(f("Аня"))
# Привет, Аня!

def call_twice(func, arg):
    return func(arg), func(arg)

print(call_twice(greet, "Сергей"))
# ('Привет, Сергей!', 'Привет, Сергей!')
```

- Функции могут иметь атрибуты (добавляются динамически):

```python
def foo():
    pass

foo.description = "Пример функции с атрибутом"
print(foo.description)
# Пример функции с атрибутом
```

---

## Встроенные функции getattr, setattr, hasattr

- Позволяют работать с объектами и их атрибутами динамически, по имени (строкой):

```python
class User:
    def __init__(self, name):
        self.name = name

u = User("Лена")
print(getattr(u, "name"))
# Лена

setattr(u, "age", 30)
print(u.age)
# 30

print(hasattr(u, "age"))
# True
```

- Особенно полезны для динамической генерации классов, сериализации, работы с данными неизвестной структуры.

---

## Модуль inspect

- Позволяет получать информацию о функциях, классах, их сигнатурах, исходном коде, аннотациях, модуле происхождения и т.п.

**Примеры:**

```python
import inspect

def func(x, y=1):
    """Пример функции."""
    return x + y

print(inspect.getdoc(func))
# Пример функции.

print(inspect.signature(func))
# (x, y=1)

print(inspect.getsource(func))
# def func(x, y=1):
#     """Пример функции."""
#     return x + y
```

- Можно получать список параметров, анализировать декораторы, находить все классы и функции в модуле, реализовывать автогенерацию документации.

---

## Модуль abc — абстрактные базовые классы

- Позволяет создавать "контракты" — классы, которые нельзя инстанцировать напрямую, но которые определяют обязательные методы для наследников.
- Помогает проектировать архитектуру, обеспечивать соблюдение интерфейсов.

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав!"

# animal = Animal()  # TypeError: Can't instantiate abstract class
d = Dog()
print(d.speak())
# Гав!
```

---

## Собственные метаклассы

- **Метакласс** — “класс для классов”, объект, который управляет созданием других классов.
- Позволяет изменять способ создания классов: добавлять атрибуты, автоматически регистрировать классы, внедрять новые методы и проверки.

```python
class UppercaseAttrs(type):
    def __new__(cls, name, bases, dct):
        attrs = {k.upper() if not k.startswith("__") else k: v for k, v in dct.items()}
        return super().__new__(cls, name, bases, attrs)

class MyClass(metaclass=UppercaseAttrs):
    foo = 42

print(hasattr(MyClass, "foo"))     # False
print(hasattr(MyClass, "FOO"))     # True
print(MyClass.FOO)                 # 42
```

- Метаклассы редко требуются в прикладном коде, но используются в ORM, фреймворках, валидаторах схем (например, Django ORM, pydantic, dataclasses).

---

## Интересные детали и фишки

- Через метапрограммирование реализуются декораторы, автогенерация документации, динамические API.
- inspect позволяет реализовать autocompletion, автоматическую регистрацию команд, подгрузку плагинов.
- Все классы создаются функцией type: `MyClass = type("MyClass", (object,), {"attr": 1})`
- Можно реализовать паттерны Singleton, Factory, Proxy через метаклассы.

---

## Типичные ошибки и подводные камни

- Избыточное метапрограммирование усложняет поддержку кода.
- Неправильное использование метаклассов — неожиданные побочные эффекты.
- Ошибки в abc: забыли реализовать обязательный метод, возникнет TypeError при создании экземпляра.
- inspect может не сработать для скомпилированных или встроенных функций.

---

## Ссылки на документацию и полезные ресурсы

- [Документация: Метапрограммирование в Python](https://docs.python.org/3/reference/datamodel.html#metaclasses)
- [inspect — Инспекция объектов](https://docs.python.org/3/library/inspect.html)
- [abc — Abstract Base Classes](https://docs.python.org/3/library/abc.html)
- [Python Metaclasses (realpython)](https://realpython.com/python-metaclasses/)
- [Документация: getattr, setattr, hasattr](https://docs.python.org/3/library/functions.html)
````
