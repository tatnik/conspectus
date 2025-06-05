# Классы и основы ООП в Python

**Объектно-Ориентированное Программирование (ООП)** — подход, при котором данные и функции объединяются в объекты (экземпляры классов).

---

## Определение класса

```jsx
class Person:
    pass
```

---

## Конструктор `__init__` и атрибуты

- Метод `__init__` вызывается при создании нового объекта.
- Атрибуты экземпляра обычно определяются внутри `__init__`.

```jsx
class Person:
    def __init__(self, name, age):
        self.name = name  # атрибут объекта
        self.age = age

# Создание объекта:
p = Person("Анна", 22)
print(p.name, p.age)   # Анна 22
```

---

## Методы и self

- Методы — функции внутри класса.
- Первый аргумент метода всегда `self` — ссылка на текущий объект.

```jsx
class Person:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f"Привет, я {self.name}!")

p = Person("Игорь")
p.say_hello()   # Привет, я Игорь!
```

---

## Наследование

- Позволяет создавать новые классы на основе существующих.

```jsx
class Student(Person):   # наследуем Person
    def __init__(self, name, age, university):
        super().__init__(name, age)  # вызов конструктора родителя
        self.university = university

s = Student("Вика", 20, "МГУ")
print(s.name, s.university)  # Вика МГУ
```

---

## Полиморфизм

- Способность разных классов иметь методы с одинаковым именем, но разной реализацией.

```jsx
class Cat:
    def speak(self):
        print("Мяу!")

class Dog:
    def speak(self):
        print("Гав!")

pets = [Cat(), Dog()]
for pet in pets:
    pet.speak()  # Мяу! Гав!
```

---

## Инкапсуляция

- Сокрытие внутренней реализации (частных атрибутов/методов).
- В Python нет строгой приватности, но есть соглашение:
  - `_protected` — защищённое (по соглашению, не используют вне класса/потомков)
  - `__private` — "приватное", Python меняет имя переменной (name mangling).

```jsx
class Example:
    def __init__(self):
        self.public = 1
        self._protected = 2
        self.__private = 3

e = Example()
print(e.public)        # 1
print(e._protected)    # 2
# print(e.__private)   # Ошибка!
print(e._Example__private)  # 3 — name mangling
```

---

- ООП используется для моделирования сложных структур.
- Инкапсуляция и наследование упрощают сопровождение и расширение кода.
- Полиморфизм — для универсального использования объектов разных классов.
