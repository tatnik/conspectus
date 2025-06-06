# Ввод и вывод данных в Python

## Функция `input()`

- Позволяет получить данные от пользователя с клавиатуры.
- Всегда возвращает строку (`str`).

```jsx
name = input('Введите ваше имя: ');
print('Привет,', name);
```

> **Важно:** если нужно получить число — преобразуй результат:

```jsx
age = int(input('Сколько вам лет? '));
```

---

## Функция `print()`

- Выводит данные на экран.
- Можно выводить сразу несколько значений через запятую — они разделяются пробелом.

```jsx
print('Привет, мир!');
x = 10;
print('Значение x:', x);
```

- Аргумент `sep` — разделитель между элементами (по умолчанию пробел):

```jsx
print("a", "b", "c", sep="-")  # a-b-c
```

- Аргумент `end` — что будет добавлено в конце (по умолчанию перевод строки):

```jsx
print("Привет", end="!")  # Привет!
```

---

## Форматирование строк

### 1. Старое форматирование через `%`

```jsx
x = 3.14159
print("Число Пи: %.2f" % x)  # Число Пи: 3.14
name = "Анна"
print("Привет, %s!" % name)
```

### 2. f-строки (f-strings, Python 3.6+)

- Самый современный и удобный способ:

```jsx
name = "Анна"
age = 30
print(f"Меня зовут {name}, мне {age} лет.")
```

### 3. Метод `.format()`

```jsx
'Текст {} текст {}'.format(значение1, значение2);
```

- Каждое `{}` заменяется на соответствующий аргумент из `.format()` по порядку.

```jsx
name = "Анна"
age = 25
s = "Меня зовут {}, мне {} лет".format(name, age)
print(s)  # Меня зовут Анна, мне 25 лет
```

---

#### Использование индексов и ключей

- Можно явно указывать **позиции**:

```jsx
"{1} + {0} = {2}".format(3, 4, 7)   # 4 + 3 = 7
```

- Можно использовать **имена**:

```jsx
'{who} любит {what}'.format((who = 'Кирилл'), (what = 'Python'));
```

---

#### Форматирование чисел

- Количество знаков после запятой:

```jsx
"{:.2f}".format(3.14159)   # 3.14
```

- Выравнивание по ширине:

```jsx
"{:10}".format("hi")     # 'hi        '
"{:>10}".format("hi")    # '        hi'
"{:^10}".format("hi")    # '    hi    '
```

- Вывод с ведущими нулями:

```jsx
"{:03}".format(7)        # '007'
```

---

#### Словари и списки

Можно подставлять элементы по ключу или индексу:

```jsx
d = { user: 'Admin', pwd: '123' };
print('Пользователь: {0[user]}, пароль: {0[pwd]}'.format(d));
```

---

#### Вложенные выражения (Python 3.6+)

Можно использовать атрибуты объектов, элементы списков/словарей:

```jsx
class User:
    def __init__(self, name):
        self.name = name

user = User("Таня")
print("Имя пользователя: {0.name}".format(user))
```

---

**_format()_** отлично подходит для сложных шаблонов и при необходимости динамического формирования строк

- может использовать позиционные и именованные аргументы
- позволяет выполнять выравнивание, задавать ширину и точность для чисел
- работает с коллекциями и объектами
