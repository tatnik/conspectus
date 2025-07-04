# Event Loop (событийный цикл) в Python

**Event Loop (событийный цикл)** — это механизм, лежащий в основе асинхронного программирования в Python. Он управляет выполнением корутин, задач и асинхронных операций, обеспечивая неблокирующее выполнение кода, когда программы ждут завершения ввода-вывода (I/O).

---

## Основные понятия

- **Event loop (событийный цикл)** — объект, который планирует и запускает асинхронные задачи, ожидает событий и обрабатывает их по мере наступления.
- Все асинхронные операции (ожидание ответа от сети, файловой системы и др.) "регистрируются" в event loop.
- Пока одна задача "ждет", event loop может выполнять другие задачи, что позволяет эффективно использовать время выполнения.

---

## Принцип работы

1. Ты создаёшь одну или несколько корутин (функций с `async def`).
2. Эти корутины запускаются в event loop — либо через `asyncio.run()`, либо вручную.
3. Когда в корутине встречается `await` с операцией ввода-вывода, выполнение этой корутины “приостанавливается”, и event loop может заняться другими задачами.
4. Когда операция завершается, event loop “пробуждает” корутину для продолжения выполнения.

---

## Простой пример использования event loop

```python
import asyncio

async def hello():
    print("Старт")
    await asyncio.sleep(1)
    print("Готово!")

asyncio.run(hello())
# Старт
# ... (через 1 секунду)
# Готово!
```

- В примере выше `asyncio.run()` автоматически создаёт event loop, запускает корутину и закрывает цикл после завершения.
- Если нужно работать с несколькими задачами — event loop сам решает, какую задачу выполнять в каждый момент времени.

---

## Ручное управление event loop

Иногда требуется более точный контроль:

```python
import asyncio

async def foo():
    print("foo")

async def bar():
    print("bar")

loop = asyncio.get_event_loop()
tasks = [foo(), bar()]
loop.run_until_complete(asyncio.gather(*tasks))
loop.close()
# foo
# bar
```

- Обычно достаточно использовать `asyncio.run()`, ручное управление нужно редко (например, в сложных фреймворках или внутри библиотек).

---

## Взаимодействие с задачами (tasks) и будущим (future)

- Event loop управляет объектами типа **Task** (создаются через `asyncio.create_task` или `asyncio.ensure_future`).
- Task — это корутина, которую event loop может приостанавливать, возобновлять и отслеживать.
- **Future** — “обещание” результата в будущем (аналог Promise в JS).

---

## Событийный цикл и блокирующий код

- Весь код, который выполняется внутри event loop, должен быть неблокирующим (использовать только асинхронные операции и `await`).
- Любая синхронная операция (например, `time.sleep` или тяжелые вычисления) блокирует event loop и может “заморозить” всю асинхронную программу.

---

## Разные реализации Event Loop в Python

### 1. Стандартный event loop (asyncio)

- Встроен в стандартную библиотеку Python (`asyncio`).
- Кроссплатформенный (Windows, Linux, MacOS), работает “из коробки”.
- В последних версиях Python по умолчанию используется универсальная реализация SelectorEventLoop (на Windows — ProactorEventLoop).
- Поддерживает все базовые возможности: запуск и планирование задач, работа с сокетами, таймерами, синхронизацией и пр.

### 2. uvloop

- **uvloop** — это быстрая альтернатива стандартному event loop, написанная на Cython, использующая библиотеку [libuv](https://github.com/libuv/libuv) (сердце Node.js).
- Заметно ускоряет асинхронный ввод-вывод, работу с сокетами, таймерами, очередями (во многих тестах — в 2–4 раза быстрее стандартного event loop).
- Полностью совместим с API asyncio: можно просто заменить event loop одной строчкой.

**Пример подключения uvloop:**

```python
import asyncio
import uvloop

asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
```

- uvloop поддерживается только на Unix-подобных системах (Linux, MacOS, BSD).
- Применяется в высоконагруженных web-приложениях (FastAPI, Sanic, aiohttp и др.), где важна скорость обработки запросов.

### 3. ProactorEventLoop (только для Windows)

- Специальная реализация для Windows — `ProactorEventLoop`.
- Использует модель асинхронного I/O на основе Windows API (I/O Completion Ports).
- Хорошо работает с асинхронными файлами, сокетами и pipe, начиная с Python 3.8 является стандартом для Windows.

### 4. SelectorEventLoop

- Кроссплатформенная реализация, основанная на использовании селекторов (select, poll, epoll, kqueue).
- Была дефолтной для всех платформ в старых версиях Python (до 3.8), теперь по умолчанию только на Unix.
- Менее эффективна на Windows для некоторых задач.

### 5. Другие альтернативные реализации

- **Tokio (через third-party проекты)** — перенос концепций из мира Rust/JS (используется редко в Python, только в исследовательских целях).
- **Trio, Curio** — сторонние асинхронные фреймворки с собственными подходами к event loop и обработке задач, не совместимы напрямую с asyncio, но предлагают интересные идеи (например, в области структурированной конкуренции).

---

### Как выбрать и использовать другую реализацию

- Если нужен максимум производительности — рекомендуется uvloop на Linux/MacOS.
- Если приложение работает только на Windows, стандартный ProactorEventLoop будет оптимален.
- Для совместимости между платформами — стандартный event loop asyncio.
- Сменить реализацию можно через политику event loop:

```python
import asyncio
import uvloop

asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
```

- Обычно смена event loop требует только одной строчки в начале программы.

---

## Интересные детали и фишки

- Внутри одного процесса может быть только один активный event loop.
- Для запуска синхронных функций внутри event loop используют `loop.run_in_executor()` (использует отдельный поток/процесс).
- В Python 3.7+ удобно использовать только `asyncio.run()` — это “правильный” способ запуска event loop.
- Если event loop уже существует (например, в Jupyter Notebook), повторный вызов `asyncio.run()` вызовет ошибку — нужно использовать другие методы (например, `await` внутри ячейки).
- Существуют разные реализации event loop (например, стандартный, uvloop — ускоренный на основе libuv).
- Некоторые библиотеки и фреймворки автоматически используют uvloop при его наличии (например, Sanic).
- uvloop не поддерживает Windows (поэтому серверные приложения часто деплоят только на Linux).
- У разных реализаций могут быть небольшие различия в поведении таймеров, обработке ошибок, мелких деталях API.

---

## Типичные ошибки и подводные камни

- Попытка запустить второй event loop внутри уже работающего event loop (`asyncio.run` вызывается дважды).
- Вызов синхронных функций (например, time.sleep) внутри асинхронного кода блокирует event loop.
- Забыли закрыть event loop вручную (при ручном управлении).
- Исключения внутри задач иногда не всплывают сразу — стоит использовать `asyncio.TaskGroup` или явно обрабатывать исключения.
- Запуск uvloop на Windows вызывает ошибку (используйте только на Unix-подобных ОС).
- Несовместимость нестандартных event loop с некоторыми специфическими библиотеками (например, старыми расширениями C).
- При миграции на другую реализацию внимательно читайте changelog — могут быть различия в поведении edge-case сценариев.

---

## Ссылки на документацию и полезные ресурсы

- [asyncio — Event Loop](https://docs.python.org/3/library/asyncio-eventloop.html)
- [PEP 3156 — Асинхронное I/O и event loop в Python](https://peps.python.org/pep-3156/)
- [Обзор асинхронного программирования в Python (Хабр)](https://habr.com/ru/post/337542/)
  [Официальная документация asyncio event loop](https://docs.python.org/3/library/asyncio-eventloop.html)
- [Документация uvloop](https://uvloop.readthedocs.io/)
- [ProactorEventLoop vs SelectorEventLoop](https://docs.python.org/3/library/asyncio-eventloop.html#event-loop-policies)
- [Fast Python asyncio: почему uvloop быстрее стандартного event loop (статья)](https://habr.com/ru/post/340146/)
- [Trio — асинхронный фреймворк с собственным event loop](https://trio.readthedocs.io/en/stable/)
- [Curio — минималистичный асинхронный фреймворк](https://curio.readthedocs.io/en/latest/)
