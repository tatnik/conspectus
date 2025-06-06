# Операторы и выражения в Python

## Арифметические операторы

| Оператор | Описание              | Пример   | Результат |
| -------- | --------------------- | -------- | --------- |
| `+`      | Сложение              | `2 + 3`  | `5`       |
| `-`      | Вычитание             | `5 - 1`  | `4`       |
| `*`      | Умножение             | `4 * 2`  | `8`       |
| `/`      | Деление (float)       | `5 / 2`  | `2.5`     |
| `//`     | Целочисленное деление | `5 // 2` | `2`       |
| `%`      | Остаток от деления    | `5 % 2`  | `1`       |
| `**`     | Возведение в степень  | `2 ** 3` | `8`       |

---

## Операторы сравнения

| Оператор | Описание         | Пример   | Результат |
| -------- | ---------------- | -------- | --------- |
| `==`     | Равно            | `3 == 3` | `True`    |
| `!=`     | Не равно         | `3 != 4` | `True`    |
| `>`      | Больше           | `5 > 2`  | `True`    |
| `<`      | Меньше           | `2 < 5`  | `True`    |
| `>=`     | Больше или равно | `5 >= 5` | `True`    |
| `<=`     | Меньше или равно | `2 <= 2` | `True`    |

---

## Логические операторы

| Оператор | Описание | Пример           | Результат |
| -------- | -------- | ---------------- | --------- |
| `and`    | И        | `True and False` | `False`   |
| `or`     | Или      | `True or False`  | `True`    |
| `not`    | Не       | `not True`       | `False`   |

```python
x = 5
print(x > 0 and x < 10)  # True, x в диапазоне от 1 до 9
print(not (x == 5))      # False
```

---

## Операторы присваивания

| Оператор | Описание                  | Пример    | Эквивалент   |
| -------- | ------------------------- | --------- | ------------ |
| `=`      | Присваивание              | `x = 5`   | —            |
| `+=`     | Прибавить и присвоить     | `x += 1`  | `x = x + 1`  |
| `-=`     | Вычесть и присвоить       | `x -= 2`  | `x = x - 2`  |
| `*=`     | Умножить и присвоить      | `x *= 3`  | `x = x * 3`  |
| `/=`     | Разделить и присвоить     | `x /= 2`  | `x = x / 2`  |
| `//=`    | Целое деление и присвоить | `x //= 2` | `x = x // 2` |
| `%=`     | Остаток и присвоить       | `x %= 2`  | `x = x % 2`  |
| `**=`    | Степень и присвоить       | `x **= 2` | `x = x ** 2` |

---

## Оператор принадлежности (`in`)

Проверяет, содержится ли элемент в коллекции (строке, списке, кортеже и т.д.).

```python
letters = ['a', 'b', 'c']
print('a' in letters)      # True
print('z' in letters)      # False

s = "hello"
print('h' in s)            # True
```

---

## Оператор тождественности (`is`)

Проверяет, ссылаются ли переменные на **один и тот же объект** в памяти.

```python
a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(a is b)  # True  (один и тот же объект)
print(a is c)  # False (разные объекты, хотя содержимое одинаковое)

x = None
print(x is None)  # Чаще всего используется так!
```

---

## Приоритет операторов (сокращённо)

1. `()` — скобки
2. `**` — возведение в степень
3. `+x, -x, ~x` — унарные операции
4. `*, /, //, %`
5. `+, -`
6. Операторы сравнения (`<`, `>`, `==`, `!=` и т.д.)
7. `not`
8. `and`
9. `or`

**Пример:**

```python
print(2 + 3 * 4)     # 14
print((2 + 3) * 4)   # 20
print(3 > 2 and 4 < 5)  # True
```
