# Разные вопросы

## Оптимизация React-приложения:

- исключение ненужных повторных рендеров
- использоваие уникального идентификатора при отображении списков
- использование хуков useMemo и useCallback для мемоизации функций
- ленивая загрузка

## Пагинация

- Определить общее количество страниц, исходя из объема имеющихся данных и количества элементов на странице.
- Добавить переменную состояния _page_ в компонент для отслеживания текущей страницы.
- Написать функцию, которая извлекает данные для определенной страницы и обновляет состояние компонента новыми данными.
- Визуализировать пользовательский интерфейс нумерации страниц, который может включать кнопки для перехода к следующей и предыдущей страницам, а также раскрывающийся список для выбора определенной страницы.
- Добавить обработчики событий для элементов пользовательского интерфейса пагинации, которые вызывают функцию fetch с соответствующим номером страницы

## Порталы

позволяют рендерить дочерние элементы в DOM-узел, который находится вне DOM-иерархии родительского компонента, например в конец <body>. Такое поведение позволяет отображать элементы за пределами блоков с, например, overflow: hidden, но при этом минимально менять дерево компонентов.

Обычно порталы используют для _модальных окон_. Достаточно определить цель в корне дерева приложения и использовать компонент Portal для монтирования модального окна отовсюду, надежно плавающего над всем содержимым.

Другой вариант применения портала - это реализация _контейнера вкладок_. Поскольку для контейнера вкладок требуется как сам элемент вкладки, так и контент для визуализации при выборе вкладки, необходимо определить два хоста: один для строки вкладок, а другой - для выбранного содержимого.

Затем монтируется массив компонентов, каждый из которых использует портал для элемента вкладки, а также для выбранного содержимого. Это позволяет разместить бизнес-логику там, где она действительно должна быть - в каждом отдельном компоненте.

Кроме того порталы могут применять в _картах наведения, загрузчиках и всплывающих сообщениях_.

## React - реактивен?

React-компоненты это функции, которые мы не вызываем на прямую. Эти функции в некоторые моменты возвращают описание того что нужно рендерить. Эти функции вызывает сам React в те самые "некоторые" моменты. И React может отложить этот вызов. React рекурсивно обходит дерево компонентов и может применять оптимизации - и задерживать рендеры чтобы избежать потерю кадров.

React в первую это UI-библиотека, и для того чтобы избежать тормозов такие меры оправданы. Т.к. данные могут поступать быстрее чем скорость обновления кадров - есть смысл объединять обновления в пакеты и обновлять пакетами. Поэтому React это скорее «Планировщик», и реактивность не проявляется в React в чистом виде.

## Переменные среды в React

\- это переменные, доступные через глобальный объект process.env. Этот глобальный объект предоставляется средой через NodeJS.

[Подробнее...](https://it-dev-journal.ru/articles/kak-ispolzovat-peremennye-sredy-v-react)

[Еще вопросы по React...](https://it-dev-journal.ru/articles/voprosy-i-otvety-react-sobesedovaniya-2023-chast-1)
