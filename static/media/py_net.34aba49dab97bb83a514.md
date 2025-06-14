# Работа с сетью в Python

Работа с сетью — важная часть многих программ: от чатов до веб-сервисов. Python предоставляет удобные инструменты для низкоуровневого и высокоуровневого сетевого взаимодействия.

---

## Сокеты (TCP/UDP)

**Сокет** — программный интерфейс для обмена данными между процессами, зачастую через сеть.

- **TCP (Transmission Control Protocol)** — протокол с установлением соединения, гарантией доставки данных, очередностью и контролем ошибок. Подходит для веба, чатов, файловых протоколов.
- **UDP (User Datagram Protocol)** — без соединения, быстрый, без гарантии доставки и очередности. Используется для потокового видео, игр, DNS и т.д.

### Пример TCP-сервера

```python
import socket

HOST = "127.0.0.1"
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print("Сервер слушает...")
    conn, addr = s.accept()
    with conn:
        print("Клиент подключился:", addr)
        while True:
            data = conn.recv(1024)
            if not data:
                break
            conn.sendall(data)  # Эхо-сервер
# Сервер слушает...
# Клиент подключился: ('127.0.0.1', <порт>)
```

### Пример TCP-клиента

```python
import socket

HOST = "127.0.0.1"
PORT = 65432

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b"Привет, сервер!")
    data = s.recv(1024)
    print("Получено:", data.decode())
# Получено: Привет, сервер!
```

---

### Пример UDP-сервера и клиента

**UDP-сервер:**

```python
import socket

HOST = "127.0.0.1"
PORT = 50007

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.bind((HOST, PORT))
    print("UDP сервер запущен...")
    while True:
        data, addr = s.recvfrom(1024)
        print("Получено от", addr, ":", data.decode())
        s.sendto(b"Ответ: " + data, addr)
# UDP сервер запущен...
# Получено от ('127.0.0.1', <порт>) : <сообщение>
```

**UDP-клиент:**

```python
import socket

HOST = "127.0.0.1"
PORT = 50007

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.sendto(b"Hello UDP!", (HOST, PORT))
    data, addr = s.recvfrom(1024)
    print("Ответ от сервера:", data.decode())
# Ответ от сервера: Ответ: Hello UDP!
```

---

## HTTP-серверы на базе стандартных библиотек

Python позволяет быстро создать простой HTTP-сервер с помощью стандартных модулей — удобно для отладки, разработки и простых задач.

### HTTP-сервер на базе http.server

**Минимальный сервер:**

```python
from http.server import SimpleHTTPRequestHandler, HTTPServer

HOST = "localhost"
PORT = 8000

with HTTPServer((HOST, PORT), SimpleHTTPRequestHandler) as httpd:
    print(f"Сервер запущен на http://{HOST}:{PORT}/")
    httpd.serve_forever()
# Сервер запущен на http://localhost:8000/
```

- По умолчанию отдаёт файлы из текущей директории.

---

### Кастомизация обработчика запросов

Можно написать свой обработчик, унаследовавшись от BaseHTTPRequestHandler:

```python
from http.server import BaseHTTPRequestHandler, HTTPServer

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(b"Привет, мир!")

HOST, PORT = "localhost", 8001
with HTTPServer((HOST, PORT), MyHandler) as httpd:
    print(f"HTTP-сервер на http://{HOST}:{PORT}/")
    httpd.serve_forever()
# HTTP-сервер на http://localhost:8001/
```

---

## Интересные детали и фишки

- Сокеты позволяют делать неблокирующие соединения (`setblocking(False)`), использовать тайм-ауты и работать с select/poll для масштабируемых серверов.
- Для асинхронных и масштабируемых задач можно использовать стандартный `asyncio` (`asyncio.start_server`) или сторонние библиотеки (`aiohttp`, `uvicorn`, `FastAPI`).
- HTTP-сервер из стандартной библиотеки не подходит для продакшена, но идеален для тестирования и прототипирования.

---

## Типичные ошибки и подводные камни

- Не закрыли соединение — может возникнуть утечка ресурсов (используйте менеджеры контекста или вручную закрывайте сокеты).
- Неверное кодирование/декодирование данных (`bytes` vs `str`) — всегда явно кодируйте и декодируйте строки.
- TCP и UDP используют разные методы: у TCP — `connect`, `accept`, `recv`, `send`; у UDP — `sendto`, `recvfrom`.
- Слишком короткие тайм-ауты или отсутствие обработки ошибок могут привести к подвисанию программы.

---

## Ссылки на документацию и полезные ресурсы

- [socket — Low-level networking interface](https://docs.python.org/3/library/socket.html)
- [http.server — HTTP servers](https://docs.python.org/3/library/http.server.html)
- [Пример асинхронного TCP-сервера на asyncio](https://docs.python.org/3/library/asyncio-stream.html#tcp-echo-server-using-streams)
- [Python: Сетевое программирование (Хабр)](https://habr.com/ru/post/163087/)
