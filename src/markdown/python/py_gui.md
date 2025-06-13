# GUI-разработка в Python

Python отлично подходит для создания настольных (desktop) графических интерфейсов. Для этого существует несколько популярных кроссплатформенных библиотек: Tkinter, PyQt, Kivy.

---

## Tkinter

- Стандартная библиотека Python для GUI (устанавливается вместе с Python).
- Классический вид, отлично подходит для простых и учебных приложений.
- Поддерживает кнопки, поля ввода, меню, холсты, диалоговые окна и др.

**Пример простого окна с кнопкой:**

```python
import tkinter as tk

def say_hello():
    label["text"] = "Привет, Tkinter!"

root = tk.Tk()
root.title("Tkinter Example")

label = tk.Label(root, text="Нажми кнопку")
label.pack()

button = tk.Button(root, text="Привет!", command=say_hello)
button.pack()

root.mainloop()
# При нажатии на кнопку надпись меняется на "Привет, Tkinter!"
```

---

## PyQt

- Мощный фреймворк на основе Qt (нужно установить через pip: `pip install PyQt5` или `PyQt6`).
- Современный внешний вид, поддержка тем, сложных виджетов, drag-and-drop, таблиц, построения графиков и др.
- Можно использовать Qt Designer для визуального создания интерфейсов.

**Пример простого окна с кнопкой (PyQt5):**

```python
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QPushButton, QVBoxLayout
import sys

def on_click():
    label.setText("Привет, PyQt!")

app = QApplication(sys.argv)
window = QWidget()
window.setWindowTitle("PyQt Example")

label = QLabel("Нажми кнопку")
button = QPushButton("Привет!")
button.clicked.connect(on_click)

layout = QVBoxLayout()
layout.addWidget(label)
layout.addWidget(button)
window.setLayout(layout)
window.show()
sys.exit(app.exec_())
# При нажатии на кнопку надпись меняется на "Привет, PyQt!"
```

---

## Kivy

- Кроссплатформенный фреймворк для современных интерфейсов: desktop, мобильных устройств, сенсорных панелей.
- Поддерживает сложную анимацию, жесты, мультитач, графику OpenGL.
- Нужно установить: `pip install kivy`

**Пример простого приложения:**

```python
from kivy.app import App
from kivy.uix.button import Button

class MyApp(App):
    def build(self):
        return Button(text="Привет, Kivy!")

if __name__ == "__main__":
    MyApp().run()
# Открывается окно с большой кнопкой "Привет, Kivy!"
```

---

## Интересные детали и фишки

- Tkinter — самый быстрый способ быстро сделать простое окно (есть почти всегда).
- PyQt поддерживает сложные элементы: вкладки, таблицы, графики, выпадающие списки, drag-n-drop, system tray и др.
- Kivy позволяет делать красивые современные мобильные и настольные приложения из одного кода.
- В PyQt и Kivy можно подключать стилизацию, анимацию, шрифты, собственные ресурсы.
- Для сложных GUI есть генераторы/редакторы интерфейсов: Qt Designer (для PyQt), Kivy Designer.

---

## Типичные ошибки и подводные камни

- Запуск нескольких mainloop (Tkinter, PyQt) одновременно — ошибка, только один GUI-цикл за раз.
- Отсутствие правильного закрытия приложения (`sys.exit()` в PyQt, `root.destroy()` в Tkinter).
- Проблемы с совместимостью версий библиотек (PyQt5 vs PyQt6).
- Не забудьте вызвать методы pack(), grid() или place() для виджетов Tkinter.
- Kivy требует OpenGL и не всегда работает в headless-средах (серверы без экрана).

---

## Ссылки на документацию и полезные ресурсы

- [Tkinter (официальная документация)](https://docs.python.org/3/library/tkinter.html)
- [PyQt5 Documentation](https://www.riverbankcomputing.com/static/Docs/PyQt5/)
- [PyQt6 Documentation](https://www.riverbankcomputing.com/static/Docs/PyQt6/)
- [Kivy Documentation](https://kivy.org/doc/stable/)
- [Туториал по Tkinter (habr)](https://habr.com/ru/post/141411/)
