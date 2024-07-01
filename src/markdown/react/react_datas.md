# REACT работа с данными

## Управление состоянием

Есть локальное и глобальное состояние. Локальное эксклюзивно для области компонента. Доступ к глобальному может получить любой компонент.
Библиотеки для управления состоянием: _Redux, Recoil, Jotai, Rematch_
Если данные передаются только из глобальной переменной в компоненты приложения, можно также применить хук useContext. Это хорошо подходит для работы с темами пользовательского интерфейса приложения и с auth провайдерами.

## Получение данных с сервера с помощью fetch

- Определяем значение по умолчанию (т.к. fetch асинхронные, а нам нужно какое-то значение, пока мы не получили ответ сервера)

```js
const defaultValue = [];
```

- Объявляем состояние для хранения данных, полученных от сервера (напр. списка пользователей)

```js
const [users, setUsers] = useState(defaultValue);
```

- Объявляем функцию получающую данные и преобразующую их в формат json :

```js
// Функция для сохранения данных
const getApiData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/').then((response) =>
    response.json()
  );

  // Обновим состояние
  setUsers(response);
};
```

- Эта функция должна срабатывать при загрузке страницы, поэтому вызываем ее из useEffect() с пустым массивом зависимостей

```js
useEffect(() => {
  getApiData();
}, []);
```

- Отображаем полученные данные

```js
<div className="app">
  {users.map((user) => (
    <div className="item-container">
      Id:{user.id} <div className="title">Title:{user.title}</div>
    </div>
  ))}
</div>
```

## Вызов API через Axios

Основной недостаток вызова fetch() заключается в том, что надо вручную конвертировать данные из API в формат JSON. Существует npm пакет axios, который сам управляет преобразованием JSON. После установки npm install axios в package.json, можно реализовать метод getAPIData() через axios следующим образом:

```js
import axios from 'axios';

const getApiData = async () => {
  const response = await axios('https://jsonplaceholder.typicode.com/todos/');

  setUsers(response);
};
```

## React Context API

Полезно использовать для передачи данных вглубь многоуровневой структуры компонетов вместо пропсов, что облегчает чтение и поддержку кода (устраняет prop drilling).

Упрощает совместное использование состояния разными компонентами (не надо поднимать состояние до общего предка)

Более эффективен чем использование пропсов (не полагается на React Virtual DOM) при передаче больших данных или повторном рендеринге.

Упрощает повторное использование компонентов в разных частях приложения.

## Передача данных между компонентами

### через пропсы (от родительского компонента потомкам, prop drilling)

```js
import { useState } from 'react';

const Parent = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
      />
      {/* передаем проп в дочерний компонент */}
      <Child value={value} />
    </div>
  );
};

const Child = ({ value }) => {
  return <span>Value is: {value || '<Not set>'}</span>;
};
```

### используя callback-функцию (от дочернего реакт компонента к родительскому)

```js
import { useState } from 'react';

const Parent = () => {
  const [value, setValue] = useState('');
  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <span>Value is: {value || '<Not set>'}</span>
      <Child onChange={handleChange} />
    </div>
  );
};

const Child = ({ onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value); // callback-функция
  };

  return (
    <input
      type="text"
      onChange={handleChange}
    />
  );
};
```

### между соседними компонентами

Данные между соседними компонентами, т.е. между компонентами на одном уровне, можно передать через общий предок. Обычно данные от одного Реакт компонента передаются вверх, в компонент-предок, через callback-функцию, а компонент-предок передает их в другой компонент через проп.

```js
import { useState } from 'react';

const Parent = () => {
  const [value, setValue] = useState('');

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <Sibling1 onChange={handleChange} />
      <Sibling2 value={value} />
    </div>
  );
};

const Sibling1 = ({ onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleChange}
    />
  );
};

const Sibling2 = ({ value }) => {
  return <span>Value is: {value || '<Not set>'}</span>;
};
```

### при помощи контекста:

- создание контекста:

```js
const LanguageContext = React.createContext(null);
```

- предоставление данных компонентам через провайдер:

```js
const App = () => {
  const contextValue = { language: 'EN' };

  return (
    <LanguageContext.Provider value={contextValue}>
      <Child />
    </LanguageContext.Provider>
  );
};
```

- получение данных в компоненте:

```js
const Child = () => {
  const { language } = React.useContext(LanguageContext);
  return <div>Application Language: {language}</div>;
};
'''

```

Полезно использовать для передачи данных вглубь многоуровневой структуры компонетов вместо пропсов, что облегчает чтение и поддержку кода (устраняет prop drilling).

Упрощает совместное использование состояния разными компонентами (не надо поднимать состояние до общего предка)

Более эффективен чем использование пропсов (не полагается на React Virtual DOM) при передаче больших данных или повторном рендеринге.

Упрощает повторное использование компонентов в разных частях приложения.

### через хранилище (store)

### между компонентами на разных страницах с помощью React Router и хука useParams:

в App.js обычно определяется маршрут

```js
<Route
  path="/user/:id"
  element={<User />}
/>
```

в компоненте получается параметр:

```js
import { useParams } from 'react-router-dom';

const User = () => {
  let { id } = useParams();

  useEffect(() => {
    console.log(`/user/${id}`);
  }, []);

  // .....
};
```
