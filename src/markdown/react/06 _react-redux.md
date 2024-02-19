# REACT-REDUX

\- это библиотека, упрощающая схему взаимодействия React с хранилищем Redux

она позволяет компонентам React считывать данные из хранилища Redux и отправлять в хранилище действия для обновления состояния

- React Redux включает <Provider />компонент, который делает хранилище Redux доступным для остальной части приложения

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- предоставляет хуки для взаимодействия с хранилищем

## useSelector

считывает значение из состояния хранилища и подписывается на обновления

## useDispatch

возвращает метод хранилища _dispatch_, позволяющий отправлять действия
