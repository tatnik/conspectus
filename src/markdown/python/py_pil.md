# Работа с изображениями и видео в Python

Python — один из самых популярных языков для обработки изображений и видео. Основные библиотеки для этих задач: Pillow (PIL, для работы с изображениями) и OpenCV (для изображений и видео, компьютерное зрение).

---

## Pillow (PIL)

- Современное “ответвление” оригинального PIL (Python Imaging Library), входит в стандартный стек для работы с изображениями.
- Поддерживает десятки форматов: JPEG, PNG, GIF, BMP, TIFF и др.
- Позволяет открывать, сохранять, изменять размер, конвертировать, обрезать, рисовать на изображениях, применять фильтры.

**Пример открытия, обработки и сохранения изображения:**

```python
from PIL import Image, ImageFilter

img = Image.open("cat.jpg")
img = img.resize((200, 200))
img = img.filter(ImageFilter.BLUR)
img.save("cat_blur.jpg")
# Откроет cat.jpg, изменит размер до 200x200, размоет, сохранит как cat_blur.jpg
```

**Рисование на изображении:**

```python
from PIL import Image, ImageDraw, ImageFont

img = Image.new("RGB", (300, 100), color="white")
draw = ImageDraw.Draw(img)
draw.rectangle([10, 10, 290, 90], outline="blue", width=3)
draw.text((20, 40), "Hello, PIL!", fill="black")
img.save("drawn.jpg")
```

**Извлечение информации о картинке:**

```python
img = Image.open("cat.jpg")
print(img.format, img.size, img.mode)
# JPEG (400, 300) RGB
```

---

## OpenCV (cv2)

- Библиотека для компьютерного зрения, обработки изображений и видео.
- Поддерживает чтение/запись/отображение изображений и видео, работу с камерами, распознавание лиц, фильтрацию, преобразования, аугментацию и многое другое.
- Требует установки через pip: `pip install opencv-python`

**Чтение и отображение изображения:**

```python
import cv2

img = cv2.imread("cat.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cv2.imshow("Gray Cat", gray)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

**Сохранение изображения:**

```python
cv2.imwrite("cat_gray.jpg", gray)
```

**Чтение и обработка видео:**

```python
import cv2

cap = cv2.VideoCapture("video.mp4")
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow("Frame", frame)
    if cv2.waitKey(1) == ord("q"):
        break
cap.release()
cv2.destroyAllWindows()
# Воспроизводит видео, окно закрывается по нажатию q
```

**Детекция лиц с помощью встроенного классификатора:**

```python
import cv2

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
img = cv2.imread("people.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=4)
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
cv2.imwrite("faces.jpg", img)
# Находит лица и рисует прямоугольники на новом файле
```

---

## Интересные детали и фишки

- Pillow позволяет легко конвертировать форматы, сохранять “webp”, “ico”, создавать анимированные GIF.
- В Pillow можно использовать шрифты для отрисовки текста (`ImageFont.truetype`).
- OpenCV подходит для потоковой обработки видео, работы с камерами в реальном времени, распознавания объектов, движения, фильтрации изображений.
- OpenCV использует цветовую схему BGR по умолчанию (а не RGB, как Pillow).
- Можно использовать вместе: Pillow для простых операций, OpenCV — для сложных фильтров и аналитики.
- Для продвинутого анализа видео (детекторы, трекинг, распознавание объектов) — см. библиотеки scikit-image, mediapipe, torchvision.

---

## Типичные ошибки и подводные камни

- Не забывайте вызывать `cv2.waitKey()` и `cv2.destroyAllWindows()` после показа изображения через OpenCV, иначе окно “зависнет”.
- При чтении некорректного/битого файла может возникнуть ошибка: проверяйте `img is not None`.
- Pillow не поддерживает некоторые современные форматы без дополнительной настройки (например, WEBP — иногда нужен дополнительный плагин).
- Размер и формат изображения могут меняться после некоторых операций — проверяйте свойства `img.size`, `img.mode`.
- В OpenCV используйте правильные кодировки путей (особенно на Windows).

---

## Ссылки на документацию и полезные ресурсы

- [Pillow (PIL) Documentation](https://pillow.readthedocs.io/en/stable/)
- [OpenCV-Python Tutorials](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- [Пример обработки изображений и видео на OpenCV (Хабр)](https://habr.com/ru/company/otus/blog/520210/)
- [scikit-image (научная обработка изображений)](https://scikit-image.org/)
