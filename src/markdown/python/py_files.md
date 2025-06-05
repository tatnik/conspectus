# Работа с файлами в Python

## Открытие файла

- Файл открывается функцией `open()`
- Формат: `open(путь, режим, encoding)`

**Режимы открытия:**

- `'r'` — чтение (по умолчанию)
- `'w'` — запись (перезапись файла)
- `'a'` — добавление (append)
- `'b'` — двоичный режим (например, `'rb'`, `'wb'`)
- `'x'` — создать новый файл (ошибка, если уже есть)

```jsx
f = open('data.txt', 'r', (encoding = 'utf-8'));
```

---

## Чтение из файла

```jsx
# Весь файл как строка
content = f.read()
print(content)

# Построчно (список строк)
f = open('data.txt', 'r', encoding='utf-8')
lines = f.readlines()
for line in lines:
    print(line.strip())
```

---

## Запись в файл

```jsx
f = open('output.txt', 'w', (encoding = 'utf-8'));
f.write('Привет, файл!\n');
f.writelines(['Строка 1\n', 'Строка 2\n']);
f.close();
```

---

## Контекстный менеджер (with)

- Позволяет избежать утечек памяти и проблем с незакрытыми файлами.
- Автоматически закрывает файл, даже если возникла ошибка.
- Рекомендуется использовать всегда.

```jsx
with open('data.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())
```

```jsx
with open('output.txt', 'a', encoding='utf-8') as f:
    f.write("Добавляем новую строку\n")
```

---

## Пример: копирование содержимого файла

```jsx
with open('input.txt', 'r', encoding='utf-8') as fin, \
     open('copy.txt', 'w', encoding='utf-8') as fout:
    for line in fin:
        fout.write(line)
```

---

- рекомендуется указывать `encoding='utf-8'` для работы с текстовыми файлами.
