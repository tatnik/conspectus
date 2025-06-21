# Визуализация данных в Python

Визуализация — ключевой этап анализа данных и Data Science. Графики и диаграммы помогают выявлять закономерности, аномалии и тренды в больших объёмах информации. В Python есть богатый выбор библиотек для создания визуализаций — от классических до интерактивных.

---

## seaborn

- Высокоуровневая надстройка над matplotlib для создания красивых и информативных статистических графиков.
- Поддержка DataFrame (Pandas), простая настройка стиля, цвета, палитр.
- Отлично подходит для исследовательского анализа данных (EDA), статистики.

**Пример — распределение значений:**

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({'value': [1, 2, 2, 3, 4, 4, 4, 5]})
sns.histplot(df['value'], kde=True)
plt.title("Распределение значений")
plt.show()
```

- Отрисует гистограмму и линию плотности по данным.

**Пример — корреляция переменных:**

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

df = sns.load_dataset("iris")
sns.pairplot(df, hue="species")
plt.show()
```

- Матрица рассеяния для набора данных iris.

---

## plotly

- Библиотека для создания интерактивных, “живых” графиков (HTML, web).
- Отлично интегрируется с Jupyter, поддерживает zoom, hover, выбор данных, 3D-графику.
- Бесплатная версия позволяет строить большинство стандартных визуализаций.

**Пример — интерактивная линейная диаграмма:**

```python
import plotly.express as px

df = px.data.gapminder().query("country == 'Russia'")
fig = px.line(df, x="year", y="gdpPercap", title="ВВП на душу населения в России")
fig.show()
```

- Откроется интерактивное окно или появится график прямо в Jupyter.

**Пример — интерактивная гистограмма:**

```python
import plotly.express as px
df = px.data.tips()
fig = px.histogram(df, x="total_bill", nbins=20, title="Чаевые")
fig.show()
```

---

## bokeh

- Библиотека для интерактивных визуализаций в браузере, подходит для создания дашбордов, веб-приложений.
- Графики динамические, с поддержкой zoom, pan, tooltips.
- Позволяет собирать собственные веб-интерфейсы с визуализациями.

**Пример — простой график:**

```python
from bokeh.plotting import figure, show

p = figure(title="Пример Bokeh", x_axis_label="x", y_axis_label="y")
p.line([1, 2, 3, 4, 5], [3, 7, 8, 5, 1], legend_label="Линия", line_width=2)
show(p)
```

**Пример — scatter plot:**

```python
from bokeh.plotting import figure, show
import numpy as np

x = np.random.rand(100)
y = np.random.rand(100)
p = figure(title="Случайные точки", tools="pan,box_zoom,reset,save")
p.scatter(x, y, size=8, color="navy", alpha=0.5)
show(p)
```

---

## Интересные детали и фишки

- seaborn по умолчанию стилизует графики — нет необходимости вручную настраивать стиль.
- plotly и bokeh позволяют строить графики для web — результат можно сразу внедрять в сайты и дашборды.
- plotly поддерживает трёхмерные графики, анимацию, карты.
- bokeh позволяет строить полноценные аналитические панели с интерактивными элементами управления.
- Для продвинутой визуализации — см. ещё matplotlib, altair, holoviews.

---

## Типичные ошибки и подводные камни

- Не вызван show() — график не отображается.
- seaborn требует pandas DataFrame (или Series) для работы со многими функциями.
- plotly и bokeh могут требовать установки дополнительных JS-библиотек при первом запуске.
- Интерпретируемые интерактивные графики могут не работать вне Jupyter (или без web-браузера).
- Не забывайте обновлять библиотеки — часто добавляются новые типы графиков и параметры.

---

## Ссылки на документацию и полезные ресурсы

- [Seaborn Documentation](https://seaborn.pydata.org/)
- [Plotly Express Documentation](https://plotly.com/python/plotly-express/)
- [Bokeh Documentation](https://docs.bokeh.org/en/latest/)
- [Статья: Визуализация данных на Python (Хабр)](https://habr.com/ru/post/485352/)
