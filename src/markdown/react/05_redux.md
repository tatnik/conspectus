# REDUX

\- это шаблон для управления состоянием приложения

## Состояние, дерево состояния (state)

`type State = any;`

**State** - это как правило объект с глубокой вложенностью или какая-то коллекция вида ключ-значение, описывающем все состояние _Redux_-приложения.

Управляется стором (_store_)

возвращается через **getState()**

## Стор (store)

\- это объект, который хранит дерево состояний приложения, в приложении должен быть только один стор

```js
type Store = {
  dispatch: Dispatch
  getState: () => State
  subscribe: (listener: () => void) => () => void
  replaceReducer: (reducer: Reducer) => void
}
```

- **dispatch(action)** базовая функция отправки (dispatch)

- **getState()** возвращает текущее состояние стора

- **subscribe(listener)** регистрирует функцию, которая будет вызвана при изменении состояния

- **replaceReducer(nextReducer)** может быть использован для реализации горячей перезагрузки (hot reload) и разделения кода

[Подробнее...]()https://reactdev.ru/libs/redux/api/Store/

### Генератор стора (store creator)

\- это функция, которая создает стор

```js
type StoreCreator = (reducer: Reducer, initialState: ?State) => Store;
```

## Экшен (action)

`type Action = Object`

\- это простой объект, которые представляет намерение изменить состояние

- обязан иметь поле **type** - тип производимого изменения (строка или константа)

- остальная структура - произвольная, в простых случаях обычно добавляется поле **payload**, которое является источником информации для выполняемого изменения

- может быть асинхронным

```js
const ADD_TODO = 'ADD_TODO';

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

### Генераторы экшенов (action creators)

\-это функции, создающие экшены

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
```

- могут быть связанными (bound action creator), они автоматически запускают отправку экшенов

- могут быть асинхронными и иметь сайд-эффекты

## Редьюсер (reducer)

`type Reducer<S, A> = (state: S, action: A) => S;`

\- это функция, рассчитывающая новое соcтояние, учитывая предыдущее состояние и экшен

- должен быть чистой функцией без побочных эффектов

- в них нельзя обращаться к API или переходить по роутам, вызывать нечистые функции

- должнен не изменять текущее значение State, а создавать его копию (с изменениями)

- при обработке неизвестного экшена должна возвращаться предыдущая версия состояния

- он никогда не должен возвращать undefined

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter,
      });
    default:
      return state;
  }
}
```

## Функция-диспетчер (dispatching function)

\- это функция, которая принимает экшен или асинхронный экшен и далее может отправить или может не отправить один или несколько экшенов в стор.

- базовая функция **dispatch**, предоставляемая экземпляром стора, всегда синхронно отправляет экшен в редьюсер вместе с предыдущим состоянием стора, она ожидает экшен в виде простого объекта, готового для использования в редьюсере

- базовый _dispatch_ може быть обернут в одну или несколько _middleware_-функций, которые могут каким либо образом преобразовывать экшены перед передачей их дальше

## Мидлвар (middleware)

```js
type MiddlewareAPI = {
  dispatch: Dispatch,
  getState: () => State,
};
type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => Dispatch;
```

\- это функция высшего порядка, которая создает функцию-диспетчер, возвращающую новую функцию-диспетчер

- наиболее распространенные случаи использования мидлваров - логгирование, поддержка асинхронных экшенов

```js
import { createStore, applyMiddleware } from 'redux';
import todos from './reducers';

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action);

    // Вызовем следующий метод dispatch в цепочке мидлваров.
    const returnValue = next(action);

    console.log('state after dispatch', getState());

    // Это наверняка будет `экшен`, если только
    // какой-нибудь `мидлвар` дальше в цепочке не изменит его.
    return returnValue;
  };
}

const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware',
});
// (Эти строки будут залогированы милдвэром:)
// will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' }
// state after dispatch: [ 'Use Redux', 'Understand the middleware' ]
```

[Подробнее...](https://reactdev.ru/libs/redux/api/applyMiddleware)

## API Redux

### createStore(reducer, [preloadedState], [enhancer])

создает и возвращает стор

- **reducer** (Function) - функция редьюсера которая возвращает следующее дерево состояния, принимая текущее состояние и экшен к обработке.
  Редьюсер должен возвращать какое-то начальное состояние, если состояние переданное ему в качестве первого аргумента не определено (undefined)

- **[preloadedState]** (any) - начальное состояние

- **[enhancer]** (Function) - расширитель стора, с Redux поставляется только _applyMiddleware()_. С помомщью compose() можно использовать несколько расширителей стора.

Когда стор создан, Redux сам отправляет редьюсеру фиктивный экшен для установки в стор начального состояния.Фиктивный экшен не надо обрабатывать напрямую.

```js
import { createStore } from 'redux';

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}

const store = createStore(todos, ['Use Redux']);

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs',
});

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]
```

### combineReducers(reducers)

преобразует объект, значениями которого являются различные функции редьюсеры, в одну функцию редьюсер, которую можно передать в метод _createStore_.

- **reducers** (Object) - объект, значения которого соответствуют различным функциям редьюсерам

_reducers/todos.js_

```js
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}
```

_reducers/counter.js_

```js
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

_reducers/index.js_

```js
import { combineReducers } from 'redux';
import todos from './todos';
import counter from './counter';

export default combineReducers({
  todos,
  counter,
});
```

_App.js_

```js
import { createStore } from 'redux';
import reducer from './reducers/index';

const store = createStore(reducer);
console.log(store.getState());
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux',
});
console.log(store.getState());
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }
```

### applyMiddleware(...middlewares)

**...middlewares** (arguments)

- возвращает функцию-расширитель стора, который применяет полученный мидлвар

- можно использовать compose() для применения нескольких расширителей стора одновременно

```js
const store = createStore(todos, ['Use Redux'], applyMiddleware(logger));
```

### bindActionCreators(actionCreators, dispatch)

**actionCreators** (Функция или Объект) Генератор экшена или объект, значениями которого являются генераторы экшенов.

**dispatch** (Функция) dispatch функция доступная в инстансе Store.

- преобразует объект, значениями которого являются генераторы экшенов, в объект с теми же ключами, но генераторами экшенов, обернутыми в вызов dispatch, т. о. они могут быть вызваны напрямую

- используется для передачи некоторых генераторов экшенов (action creators) вниз к компоненту, который ничего не знает о Redux

### compose(...functions)

- возвращает функцию, полученную путем композиции функций справа налево

- ожидается, что каждая функция принимает один параметр. Ее возвращаемое значение будет представлено в качестве аргумента для функции стоящей слева, и так далее. Исключением является самый правый аргумент, который может принимать несколько параметров.
