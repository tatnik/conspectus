# REACT примеры

## Отследить клик за пределами компонента

```js
export default function OutsideAlerter() {
  const clickMeDivRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        alert('You clicked outside of me!');
      }
    };

    // Добавим прослушивание событий
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Удалим прослушивание событий
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickMeDivRef]);

  return <div ref={clickMeDivRef}>Clicked me?</div>;
}
```

## Установить фокус на поле ввода после монтирования компонента

```js
import React, { useEffect, useRef } from 'react';

const SearchPage = () => {
  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <div>
      <input
        ref={textInput}
        type="text"
      />
    </div>
  );
};
```

## Render props

\- функция, которая сообщает компоненту, что необходимо рендерить.

```js
export default function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
    </div>
  );
}
```

```js
...
<List
  items={products}
  renderItem={(product, isHighlighted) =>
    <Row
      key={product.id}
      title={product.title}
      isHighlighted={isHighlighted}
    />
  }
/>
...
```

## Обработка асинхронных действий

Одним из способов является использование ключевых слов **async** и **await**, которые позволяют писать асинхронный код в синхронном стиле.

```js
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://..../endpoint');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return <div>{data ? <div>{data.message}</div> : <div>Loading...</div>}</div>;
}
```

Еще один способ обработки асинхронных функций в React — использовать библиотеку, такую как **axios** или **fetch**, для выполнения вызовов API

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://my-api.com/endpoint');
      setData(response.data);
    }
    fetchData();
  }, []);

  return <div>{data ? <div>{data.message}</div> : <div>Loading...</div>}</div>;
}
```
