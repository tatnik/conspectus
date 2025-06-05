# Работа с файловой системой в Python

## Модуль `os` — работа с путями и файлами

### Получить текущий рабочий каталог

```jsx
import os
print(os.getcwd())  # Текущий каталог
```

### Перейти в другой каталог

```jsx
os.chdir('/path/to/dir');
```

### Получить список файлов и папок в директории

```jsx
files = os.listdir('.');
print(files);
```

### Создать папку

```jsx
os.mkdir('new_folder')      # Одна папка
os.makedirs('a/b/c')        # Вложенные папки
```

### Удалить файл или папку

```jsx
os.remove('file.txt')       # Файл
os.rmdir('new_folder')      # Пустая папка
os.removedirs('a/b/c')      # Вложенные пустые папки
```

---

## Модуль `os.path` — работа с путями

```jsx
import os

path = 'folder/file.txt'
print(os.path.exists(path))         # True, если существует
print(os.path.isabs(path))          # Абсолютный путь?
print(os.path.isfile(path))         # Файл?
print(os.path.isdir('folder'))      # Папка?

print(os.path.abspath(path))        # Абсолютный путь
print(os.path.basename(path))       # Имя файла: file.txt
print(os.path.dirname(path))        # Путь до файла: folder
print(os.path.join('a', 'b.txt'))   # 'a/b.txt'
```

---

## Модуль `shutil` — копирование, перемещение, удаление

```jsx
import shutil

shutil.copy('src.txt', 'dst.txt')             # Копировать файл
shutil.copytree('src_dir', 'dst_dir')         # Копировать папку рекурсивно
shutil.move('old.txt', 'archive/old.txt')     # Переместить файл/папку
shutil.rmtree('dir_to_delete')                # Удалить папку с содержимым
```

---

## Советы

- Проверяй существование файлов перед удалением или копированием.
- Для временных файлов и папок используй модуль `tempfile`.
- Для кроссплатформенной работы с путями (Windows/Linux) — всегда используй `os.path.join`.

---

## Альтернатива: модуль `pathlib` (современный способ)

```jsx
from pathlib import Path

p = Path('some_dir/some_file.txt')
print(p.exists())
print(p.is_file())
print(p.parent)              # Родительская папка
print(p.name)                # Имя файла
p.mkdir(parents=True, exist_ok=True)   # Создать папки
for file in p.parent.iterdir():
    print(file)
```

---

**Итого:**

- Для базовых операций — `os` и `os.path`.
- Для копирования и удаления — `shutil`.
- Для современного и удобного кода — `pathlib`.
