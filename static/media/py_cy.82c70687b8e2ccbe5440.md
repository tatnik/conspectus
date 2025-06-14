# Встраивание C/C++ и использование Cython в Python

Python — гибкий язык, но для самых ресурсоёмких задач (обработка больших данных, интенсивные вычисления) иногда не хватает производительности. Для ускорения кода и интеграции с существующими библиотеками на C/C++ используют Cython и специальные модули для связи с C.

---

## Ускорение кода через Cython

- **Cython** — надстройка над Python, позволяющая писать код “на Python с типами”, который компилируется в C-расширение и работает в разы быстрее.
- Позволяет добавлять аннотации типов (static typing), использовать C-массивы, напрямую вызывать C-функции.
- Широко используется в научных библиотеках (numpy, pandas, scikit-learn).

### Пример ускорения с помощью Cython

1. Создайте файл `fastsum.pyx`:

   ```python
   # fastsum.pyx
   def fast_sum(int n):
       cdef int s = 0
       for i in range(n):
           s += i
       return s
   ```

2. Подготовьте файл `setup.py` для сборки:

   ```python
   from setuptools import setup
   from Cython.Build import cythonize

   setup(
       ext_modules = cythonize("fastsum.pyx")
   )
   ```

3. Соберите модуль:

   ```bash
   python setup.py build_ext --inplace
   ```

4. Используйте модуль из Python:

   ```python
   import fastsum
   print(fastsum.fast_sum(10))
   # 45
   ```

- Cython позволяет смешивать чистый Python и “почти C” с простым синтаксисом.
- Можно использовать типизацию: `cdef int`, `cdef double[:]`, `cdef class`.

---

## Связывание с C-библиотеками

Python умеет напрямую работать с внешними библиотеками на C, что позволяет использовать существующие высокоэффективные библиотеки, писать критические по скорости участки или оборачивать C/C++ API для Python-кода.

---

### ctypes

- Стандартная библиотека Python для вызова C-функций из динамических библиотек (.so/.dll).
- Не требует дополнительной компиляции, работает на всех платформах.

**Пример:**

```python
import ctypes

libc = ctypes.CDLL("libc.so.6")  # на Linux
# libc = ctypes.CDLL("msvcrt.dll")  # на Windows
print(libc.abs(-10))
# 10
```

- Можно описывать C-структуры через ctypes.Structure, работать с массивами, указателями.

---

### cffi (C Foreign Function Interface)

- Более гибкая, современная и "питоничная" альтернатива ctypes.
- Позволяет как динамически подключать, так и компилировать обёртки для C-библиотек.
- Лучше для сложных интерфейсов и интеграции с C.

**Пример динамического подключения:**

```python
from cffi import FFI

ffi = FFI()
lib = ffi.dlopen("libc.so.6")
ffi.cdef("int abs(int x);")
print(lib.abs(-123))
# 123
```

**Пример компиляции обёртки:**

```python
# build_myfunc.py
from cffi import FFI
ffi = FFI()
ffi.cdef("int mysum(int, int);")
ffi.set_source("_myfunc", '''
    int mysum(int a, int b) { return a + b; }
''')
ffi.compile()

# main.py
from _myfunc import lib
print(lib.mysum(2, 3))
# 5
```

---

## Интересные детали и фишки

- Cython автоматически оптимизирует циклы, арифметику, работу с массивами и строками — прирост может быть в десятки и сотни раз.
- С помощью Cython можно оборачивать существующие C-библиотеки и создавать Cython-расширения с Python API.
- cffi поддерживает работу и с C++, если вручную прописать extern "C".
- Модуль `ctypes` подходит для простых задач, `cffi` — для сложных и поддерживаемых в будущем решений.
- Интеграция с C++ требует дополнительных усилий (через extern "C", вручную сгенерированные обёртки).

---

## Типичные ошибки и подводные камни

- Неправильные типы аргументов при вызове C-функций могут привести к падению Python-интерпретатора.
- Указатели, массивы, память в C — всё это требует осторожности! Не освобождайте память дважды, не передавайте “мёртвые” указатели.
- Переменная, определённая как C-типа (`cdef int`), недоступна в чистом Python-коде — только внутри cython-части.
- Отсутствие компилятора C/C++ на машине приводит к ошибкам при сборке Cython- и cffi-расширений.

---

## Ссылки на документацию и полезные ресурсы

- [Cython — The Cython compiler](https://cython.org/)
- [Документация по Cython](https://cython.readthedocs.io/en/latest/)
- [ctypes — Python C API](https://docs.python.org/3/library/ctypes.html)
- [cffi: Foreign Function Interface for Python](https://cffi.readthedocs.io/en/latest/)
- [Кратко: Вызов C из Python (Хабр)](https://habr.com/ru/post/485916/)
