# Работа с датой и временем в Python: модуль datetime

## Импорт и базовые объекты

Модуль `datetime` — стандартный инструмент для работы с датой и временем.

```jsx
import datetime
```

### Основные объекты:

- `datetime.date` — только дата (год, месяц, день)
- `datetime.time` — только время (часы, минуты, секунды, микросекунды)
- `datetime.datetime` — дата и время
- `datetime.timedelta` — разница между датами/временем (интервал)

---

## Текущая дата и время

```jsx
from datetime import datetime, date

now = datetime.now()      # текущая дата и время
today = date.today()      # только дата

print(now)    # 2025-06-04 15:32:10.123456
print(today)  # 2025-06-04
```

---

## Создание объекта даты и времени

```jsx
from datetime import datetime, date, time

dt = datetime(2025, 6, 4, 15, 45)
d = date(2024, 12, 31)
t = time(12, 30)

print(dt)  # 2025-06-04 15:45:00
print(d)   # 2024-12-31
print(t)   # 12:30:00
```

---

## Разница между датами: timedelta

```jsx
from datetime import timedelta

delta = timedelta(days=5, hours=3)
dt1 = datetime(2025, 6, 4, 10, 0)
dt2 = dt1 + delta
print(dt2)  # 2025-06-09 13:00:00

# Разница между датами
d1 = datetime(2025, 6, 4)
d2 = datetime(2025, 6, 1)
print((d1 - d2).days)  # 3
```

---

## Форматирование и парсинг дат

- Преобразование даты/времени в строку:

```jsx
now = datetime.now()
s = now.strftime("%d.%m.%Y %H:%M")
print(s)   # '04.06.2025 15:34'
```

- Преобразование строки в объект даты/времени:

```jsx
s = "31/12/2024 12:30"
dt = datetime.strptime(s, "%d/%m/%Y %H:%M")
print(dt)  # 2024-12-31 12:30:00
```

**Форматы:**

- `%d` — день, `%m` — месяц, `%Y` — год
- `%H` — часы (24ч), `%M` — минуты, `%S` — секунды

---

## Дополнительные возможности

- Получить день недели:

```jsx
dt = datetime.now()
print(dt.weekday())   # 0 — понедельник, 6 — воскресенье
```

- Получить только дату или время:

```jsx
dt = datetime.now()
print(dt.date())   # дата
print(dt.time())   # время
```

---

- Для работы с временными зонами и сложными датами есть расширения: модуль `pytz`, библиотека `dateutil`.

---
