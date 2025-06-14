# Машинное обучение и Data Science в Python

Python — основной язык для анализа данных и машинного обучения благодаря богатому набору библиотек и простоте использования. Ниже — краткий обзор самых важных инструментов и примеры их использования.

---

## NumPy

- Базовая библиотека для научных вычислений и работы с многомерными массивами (numpy.ndarray).
- Быстрое выполнение операций с векторами, матрицами, поддержка трансформаций, случайных чисел, линейной алгебры.

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([10, 20, 30])
print(a + b)           # [11 22 33]
print(a.mean())        # 2.0
print(np.dot(a, b))    # 140 (скалярное произведение)
```

---

## SciPy

- Научная библиотека поверх NumPy.
- Огромный набор функций: оптимизация, интегрирование, интерполяция, работа с сигналами, статистика, специальные функции.

```python
from scipy import optimize

def f(x):
    return x**2 + 10*np.sin(x)

result = optimize.minimize(f, x0=0)
print(result.x)  # [ -1.306... ] — точка минимума функции
```

---

## Pandas

- Главный инструмент для работы с табличными данными (DataFrame, Series).
- Загрузка/сохранение CSV, Excel, SQL, фильтрация, группировка, сводные таблицы, агрегации, обработка пропусков.

```python
import pandas as pd

df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
print(df.mean())           # Среднее по столбцам
print(df["A"].sum())       # Сумма по столбцу A
print(df[df["B"] > 4])     # Фильтрация по значению B
```

---

## Scikit-learn

- Основная библиотека для классического машинного обучения: классификация, регрессия, кластеризация, уменьшение размерности, метрики, конвейеры обработки данных.
- Содержит огромное количество алгоритмов и утилит для подготовки, анализа и тестирования данных.

```python
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

model = LinearRegression()
model.fit(X, y)
print(model.predict([[5]]))    # [10.]
print(model.coef_, model.intercept_)  # [2.] 0.0
```

---

## TensorFlow

- Гибкая и мощная платформа для построения нейронных сетей и глубокого обучения (от Google).
- Поддерживает обучение на GPU, масштабирование на кластеры, создание сложных моделей (CNN, RNN, GAN).
- Высокоуровневый API Keras встроен в TensorFlow.

```python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(8, activation='relu', input_shape=(1,)),
    tf.keras.layers.Dense(1)
])
model.compile(optimizer="adam", loss="mse")
model.fit([[1], [2], [3], [4]], [2, 4, 6, 8], epochs=100, verbose=0)
print(model.predict([[5]]))    # ≈ [10.]
```

---

## PyTorch

- Альтернатива TensorFlow от Facebook, также для глубокого обучения.
- Императивный стиль, удобно для исследований и гибкой настройки моделей.
- Поддержка GPU, динамическое вычисление графа (autograd).

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(1, 8),
    nn.ReLU(),
    nn.Linear(8, 1)
)
loss_fn = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

X = torch.tensor([[1.], [2.], [3.], [4.]])
y = torch.tensor([[2.], [4.], [6.], [8.]])

for epoch in range(100):
    optimizer.zero_grad()
    out = model(X)
    loss = loss_fn(out, y)
    loss.backward()
    optimizer.step()

print(model(torch.tensor([[5.]])))  # ≈ tensor([[10.]])
```

---

## Интересные детали и фишки

- NumPy и Pandas — де-факто стандарт для любого анализа данных, часто используются вместе.
- Scikit-learn хорош для быстрого прототипирования моделей и анализа результатов, поддерживает “конвейеры” (pipeline) для препроцессинга.
- TensorFlow и PyTorch позволяют строить нейронные сети любой сложности, в том числе производить инференс на мобильных устройствах и серверах.
- Для визуализации данных чаще всего используются Matplotlib, Seaborn, Plotly.
- Data Science-проекты часто оформляют в виде Jupyter-ноутбуков.
- PyTorch особенно любят исследователи, TensorFlow часто применяют для production-разработки.

---

## Типичные ошибки и подводные камни

- Несовпадение форматов и размерностей массивов (shape) при использовании NumPy, Pandas и фреймворков ML.
- Неочищенные пропуски и аномалии в данных — “мусор на входе, мусор на выходе”.
- Недостаточная регуляризация, переобучение (overfitting) моделей.
- Неиспользование GPU — медленное обучение глубоких моделей.
- Несоответствие версий библиотек (особенно TensorFlow, PyTorch и CUDA).

---

## Ссылки на документацию и полезные ресурсы

- [NumPy](https://numpy.org/doc/)
- [SciPy](https://docs.scipy.org/doc/scipy/)
- [Pandas](https://pandas.pydata.org/docs/)
- [Scikit-learn](https://scikit-learn.org/stable/documentation.html)
- [TensorFlow](https://www.tensorflow.org/overview)
- [PyTorch](https://pytorch.org/docs/stable/index.html)
- [Jupyter](https://jupyter.org/)
- [Matplotlib](https://matplotlib.org/stable/users/index.html)
