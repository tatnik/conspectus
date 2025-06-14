# Асинхронное программирование

**Асинхронное программирование** — стиль разработки, при котором задачи выполняются параллельно, не блокируя основной поток выполнения. Позволяет эффективно обрабатывать множество операций ввода-вывода (I/O), таких как сетевые запросы или доступ к файлам, без создания дополнительных потоков или процессов.

---

## Термины и базовые понятия

- **Коррутина (coroutine)** — специальная функция, которую можно “приостанавливать” и “возобновлять”, отдавая управление обратно планировщику задач. Определяется через `async def`.
- **await** — оператор, который приостанавливает выполнение коррутины до завершения асинхронной операции.
- **Модуль `asyncio`** — стандартная библиотека для асинхронного программирования, предоставляет цикл событий (event loop), задачи (tasks), будущее (future), средства синхронизации.
- **Событийный цикл (event loop)** — механизм, который управляет и планирует выполнение асинхронных задач.

---

## Пример коррутины и использования async/await

```python
import asyncio

async def say_hello():
    print("Привет!")
    await asyncio.sleep(1)
    print("Прошла секунда")

async def main():
    await say_hello()
    await say_hello()

asyncio.run(main())
# Привет!
# Прошла секунда
# Привет!
# Прошла секунда
```

- Все функции, определённые как `async def`, возвращают коррутину.
- Чтобы запустить коррутину, используйте `await` (внутри другой коррутины) или функцию `asyncio.run()` (на верхнем уровне).

---

## Запуск нескольких задач параллельно

```python
import asyncio

async def worker(name, delay):
    print(f"{name} стартовал")
    await asyncio.sleep(delay)
    print(f"{name} завершён")

async def main():
    task1 = asyncio.create_task(worker("A", 2))
    task2 = asyncio.create_task(worker("B", 1))
    await task1
    await task2

asyncio.run(main())
# A стартовал
# B стартовал
# B завершён
# A завершён
```

- Задачи могут выполняться параллельно (по времени ожидания I/O), но в одном потоке.
- Для параллельного ожидания сразу нескольких задач используйте `await asyncio.gather(...)`.

---

## Асинхронные очереди, таймеры и синхронизация

```python
import asyncio

async def consumer(queue):
    while True:
        item = await queue.get()
        print(f"Обработано: {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    consumer_task = asyncio.create_task(consumer(queue))
    for i in range(5):
        await queue.put(i)
    await queue.join()
    consumer_task.cancel()

asyncio.run(main())
# Обработано: 0
# Обработано: 1
# Обработано: 2
# Обработано: 3
# Обработано: 4
```

- В модуле `asyncio` есть свои версии примитивов: `asyncio.Queue`, `asyncio.Lock`, `asyncio.Event`, которые работают асинхронно.

---

## Асинхронные библиотеки

- **aiohttp** — асинхронный HTTP-клиент и сервер для Python. Используется для написания высокопроизводительных web-приложений и клиентов API.
- **aiogram** — асинхронный фреймворк для создания Telegram-ботов. Основан на asyncio и поддерживает быструю обработку большого количества сообщений.

### Пример асинхронного HTTP-запроса с aiohttp:

```python
import aiohttp
import asyncio

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.text()

async def main():
    html = await fetch('https://python.org')
    print(html[:200])

asyncio.run(main())
# (Вывод первых 200 символов HTML-кода главной страницы python.org)
```

---

## Интересные детали и фишки

- Асинхронное программирование не ускоряет вычисления, но эффективно “маскирует” ожидание I/O.
- Можно комбинировать синхронные и асинхронные библиотеки, но синхронные вызовы могут блокировать event loop.
- Для интеграции с потоками и процессами используйте `run_in_executor`.
- Асинхронные генераторы (`async def ... yield`) позволяют получать значения асинхронно.
- Для unit-тестирования асинхронного кода используйте pytest-asyncio или встроенные возможности asyncio.
- Многие современные библиотеки (aiomysql, aioredis, asyncpg) поддерживают асинхронный I/O.

---

## Типичные ошибки и подводные камни

- Попытка использовать `await` вне коррутины (вызывает SyntaxError).
- Блокировка event loop синхронными операциями (например, time.sleep вместо await asyncio.sleep).
- Забыли обработать исключения внутри задач (`asyncio.create_task` — исключения не всегда всплывают).
- Многократный запуск event loop в одном процессе (`asyncio.run` можно вызывать только один раз в процессе).
- Попытка обратиться к результату задачи до её завершения.

---

## Ссылки на документацию и полезные ресурсы

- [asyncio — Асинхронное программирование в Python](https://docs.python.org/3/library/asyncio.html)
- [aiohttp — Асинхронный HTTP клиент/сервер](https://docs.aiohttp.org/)
- [aiogram — Асинхронные Telegram-боты](https://docs.aiogram.dev/en/latest/)
- [PEP 492 — Коррутины с синтаксисом async/await](https://peps.python.org/pep-0492/)
