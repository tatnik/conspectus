# Итераторы и генераторы в Python

## Протокол итераторов

**Итератор** — это объект, по которому можно "проходить" в цикле (`for`) и получать элементы по одному за раз.  
**Итерируемый объект** — это любой объект, у которого реализован метод `__iter__()`, возвращающий итератор.

- Итератор обязательно реализует методы:
  - `__iter__()` — возвращает сам себя
  - `__next__()` — возвращает следующий элемент или выбрасывает исключение `StopIteration`

**Пример:**

```jsx
nums = [1, 2, 3]
it = iter(nums)         # Получаем итератор
print(next(it))         # 1
print(next(it))         # 2
print(next(it))         # 3
# next(it)  # StopIteration!
```

---

## Создание своих итераторов

Можно написать класс-итератор вручную:

```jsx
class Counter:
    def __init__(self, start, stop):
        self.current = start
        self.stop = stop

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.stop:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

for n in Counter(5, 8):
    print(n)  # 5, 6, 7
```

---

## Генераторные функции (`yield`)

**Генератор** — это функция, которая вместо `return` использует ключевое слово `yield` для "ленивой" выдачи элементов по одному.

```jsx
def squares(n):
    for i in range(n):
        yield i * i

for s in squares(5):
    print(s)  # 0, 1, 4, 9, 16
```

**Особенности:**

- Каждый вызов `yield` "замораживает" состояние функции и возвращает значение.
- При следующем обращении выполнение продолжается с этого места.

---

## Ленивые вычисления

**Ленивость** — элементы вычисляются только по мере запроса (экономия памяти).

- Генераторы не хранят весь результат в памяти:

```jsx
gen = (x**2 for x in range(10**8))
print(next(gen))  # 0
```

- Их можно использовать для обработки "потоков" данных, больших файлов и последовательностей.

---

## Неочевидные возможности

- Можно вручную вызывать методы генератора: `.send(value)`, `.throw(exc)`, `.close()`
- Генераторы можно использовать для создания "кооперативных" задач (корутин) — см. `asyncio`
- Генераторы можно комбинировать и строить "конвейеры" обработки данных

```jsx
def double(data):
    for x in data:
        yield x * 2

def filter_even(data):
    for x in data:
        if x % 2 == 0:
            yield x

numbers = range(10)
pipeline = double(filter_even(numbers))
print(list(pipeline))  # [0, 4, 8, 12, 16]
```

---

- Генераторы удобно использовать для работы с большими данными или потоками.
- Генераторная функция может возвращать не только значения, но и управлять потоком данных (например, делить большие задачи на части).

---

## Типичные ошибки и подводные камни

- Попытка многократно итерироваться по уже использованному генератору (он выдаст пустую последовательность).
- Использование генератора там, где нужен список (например, индексация не работает).
- Забыли обработать StopIteration (например, при ручном вызове `next()` без цикла).

## Полезные примеры использования

**Чтение файла построчно:**

```python
def read_lines(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

for line in read_lines('file.txt'):
    print(line)
```

**Бесконечный генератор:**

```python
def count_up(start=0):
    while True:
        yield start
        start += 1

gen = count_up()
for _ in range(5):
    print(next(gen))  # 0, 1, 2, 3, 4
```

---

## Ссылки на документацию и полезные ресурсы

- [PEP 255 — Simple Generators](https://peps.python.org/pep-0255/)
- [Документация: Генераторы и yield](https://docs.python.org/3/reference/expressions.html#generator-expressions)
- [Документация: itertools](https://docs.python.org/3/library/itertools.html)
