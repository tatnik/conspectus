# Обработка ошибок в Python

## Базовые конструкции: try, except, else, finally

### try ... except

- Используется для "ловли" ошибок (исключений), чтобы программа не завершалась аварийно.

```jsx
try:
    x = int(input("Введите число: "))
    print("Вы ввели", x)
except ValueError:
    print("Это не число!")
```

### try ... except ... else

- Блок `else` выполняется, если ошибок не возникло.

```jsx
try:
    file = open("test.txt")
except FileNotFoundError:
    print("Файл не найден.")
else:
    print("Файл успешно открыт!")
    file.close()
```

### try ... except ... finally

- Блок `finally` выполняется **всегда** — возникло исключение или нет. Обычно используется для освобождения ресурсов.

```jsx
try:
    f = open("test.txt")
    # Работа с файлом
except Exception:
    print("Произошла ошибка!")
finally:
    print("Закрываем файл (если был открыт)")
    try:
        f.close()
    except:
        pass
```

---

## Перехват нескольких исключений

```jsx
try:
    # какой-то код
except (ValueError, TypeError) as e:
    print("Ошибка:", e)
```

---

## Генерация собственных исключений

- Используй `raise` для генерации ошибки вручную.

```jsx
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Деление на ноль запрещено!")
    return a / b
```

---

## Собственные классы исключений

- Можно создавать свои типы ошибок, наследуя их от `Exception`.

```jsx
class MyError(Exception):
    pass

def do_something(x):
    if x < 0:
        raise MyError("Число не может быть отрицательным!")

try:
    do_something(-5)
except MyError as e:
    print("Поймано собственное исключение:", e)
```

---

## Ошибки времени выполнения (Run-time Errors / Exceptions)

### А. Арифметические ошибки

- **ZeroDivisionError** — деление на ноль
- **OverflowError** — превышение максимально допустимого значения
- **FloatingPointError** — ошибка с плавающей точкой (редко)

### Б. Ошибки типа и значения

- **TypeError** — операция над объектами несовместимых типов
- **ValueError** — аргумент функции имеет правильный тип, но некорректное значение
- **IndexError** — индекс вне диапазона последовательности
- **KeyError** — обращение к несуществующему ключу в словаре
- **AttributeError** — объект не имеет указанного атрибута
- **NameError** — переменная или имя не определены
- **UnboundLocalError** — локальная переменная используется до присваивания
- **NotImplementedError** — метод или функция не реализованы

### В. Ввод-вывод и файловые ошибки

- **IOError** — базовая ошибка ввода-вывода (в новых версиях часть OSError)
- **OSError** — ошибка операционной системы (работа с файлами, путями и т.д.)
- **FileNotFoundError** — файл не найден
- **PermissionError** — недостаточно прав для доступа к файлу/каталогу
- **IsADirectoryError** — ожидался файл, а это директория
- **BlockingIOError**, **ChildProcessError** и др.

### Г. Импорт и модули

- **ImportError** — ошибка при импорте модуля
- **ModuleNotFoundError** — модуль не найден

### Д. Операции с памятью и объектами

- **MemoryError** — недостаточно памяти
- **RecursionError** — превышена максимальная глубина рекурсии

### Е. Прочие часто используемые

- **StopIteration** — сигнал окончания итерации (обычно внутри циклов for)
- **StopAsyncIteration** — для асинхронных итераций
- **AssertionError** — ошибка assert

[Полный список стандартных исключений](https://docs.python.org/3/library/exceptions.html)
