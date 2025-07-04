# Промисы (Promises) в JavaScript

**Промис (Promise)** — это встроенный объект для организации асинхронного программирования в JavaScript. Он представляет результат асинхронной операции, которая может завершиться успешно (resolved), с ошибкой (rejected) или ещё быть в процессе (pending).

---

## Основные состояния промиса

- **pending** — ожидает завершения (исходное состояние).
- **fulfilled** — успешно выполнен (resolve).
- **rejected** — завершён с ошибкой (reject).

---

## Создание промиса

```js
const promise = new Promise((resolve, reject) => {
  // асинхронный код здесь
  if (/* всё хорошо */) {
    resolve("Результат");
  } else {
    reject("Ошибка");
  }
});
```

---

## Использование then/catch/finally

- `then(onFulfilled, onRejected)` — обработка успешного и ошибочного завершения.
- `catch(onRejected)` — обработка ошибок.
- `finally()` — выполнится всегда, после then/catch.

```js
promise
  .then((result) => {
    console.log('Успех:', result);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  })
  .finally(() => {
    console.log('Операция завершена');
  });
```

---

## Цепочки промисов

- then возвращает новый промис, что позволяет строить цепочки асинхронных действий.
- Можно возвращать новые промисы внутри then для последовательного выполнения.

```js
doAsync()
  .then((result1) => doAnother(result1))
  .then((result2) => {
    console.log('Финальный результат:', result2);
  })
  .catch((error) => {
    console.error('Обработка ошибки:', error);
  });
```

---

## Промисификация (Promise wrapper)

- Преобразование функций обратного вызова (callback) в промисы:

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(1000).then(() => console.log('Прошла 1 секунда'));
```

---

## Статические методы Promise

- **Promise.resolve(value)** — создаёт выполненный промис.
- **Promise.reject(error)** — создаёт отклонённый промис.

- **Promise.all([p1, p2, ...])** — ждёт выполнения всех промисов, результат — массив значений. Если хоть один ошибся — ошибка сразу (остальные игнорируются).

```js
Promise.all([fetch('/data1.json'), fetch('/data2.json')])
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  .then((dataArr) => {
    console.log('Все данные загружены:', dataArr);
  })
  .catch((err) => {
    console.error('Ошибка загрузки:', err);
  });
```

- **Promise.race([p1, p2, ...])** — ждёт первый завершившийся промис, возвращает его результат

```js
const p1 = new Promise((res) => setTimeout(() => res('OK'), 100));
const p2 = new Promise((_, rej) => setTimeout(() => rej('ERROR'), 50));

Promise.race([p1, p2]).then(console.log).catch(console.error);
// Выведет: ERROR (reject первым завершился p2)
```

- **Promise.allSettled([p1, p2, ...])** — ждёт выполнения всех, отдаёт массив статусов и результатов (неважно успех/ошибка).

```js
function success() {
  return new Promise((resolve) => setTimeout(() => resolve('Успех'), 1000));
}
function failure() {
  return new Promise((_, reject) => setTimeout(() => reject('Ошибка'), 1500));
}

Promise.allSettled([success(), failure()]).then((results) => {
  console.log('Итоги:', results);
  // Итоги: [
  //   { status: 'fulfilled', value: 'Успех' },
  //   { status: 'rejected', reason: 'Ошибка' }
  // ]
});
```

- **Promise.any([p1, p2, ...])** — ждёт первый успешно завершившийся промис (resolve). Ошибки игнорируются до победного resolve. Если все завершились с ошибкой — возвращает AggregateError.

```js
const p1 = new Promise((_, rej) => setTimeout(() => rej('FAIL1'), 100));
const p2 = new Promise((_, rej) => setTimeout(() => rej('FAIL2'), 50));
const p3 = new Promise((res) => setTimeout(() => res('SUCCESS'), 70));

Promise.any([p1, p2, p3])
  .then(console.log)
  .catch((e) => console.error(e.errors));
// Выведет: SUCCESS (resolve p3, даже если до этого были ошибки)
```

Если все завершились с ошибкой:

```js
Promise.any([p1, p2])
  .then(console.log)
  .catch((e) => console.log(e.errors));
// Выведет: [ 'FAIL1', 'FAIL2' ]
```

---

## Сравнение методов Promise.all, Promise.race, Promise.allSettled, Promise.any

| Метод              | Когда завершится              | Результат при успехе                      | Поведение при ошибке                       | Если все с ошибкой     | Итоговое значение при ошибках  |
| ------------------ | ----------------------------- | ----------------------------------------- | ------------------------------------------ | ---------------------- | ------------------------------ |
| Promise.all        | Когда все успешно завершены   | Массив результатов всех промисов          | Первый промис с ошибкой — reject           | Сразу reject           | Ошибка первого промиса         |
| Promise.race       | При первом завершении (любом) | Значение/ошибка первого завершившегося    | Первый завершившийся промис — reject       | Сразу reject           | Ошибка первого завершения      |
| Promise.allSettled | Когда все завершились         | Массив объектов со статусом и результатом | Неважно: успех или ошибка, все фиксируется | Никогда не отклоняется | Массив с info по каждому       |
| Promise.any        | При первом успешном resolve   | Значение первого успешно завершённого     | Ошибки игнорируются, ждёт успех            | Сразу reject           | AggregateError (массив ошибок) |

---

## Программная реализация Promise.all, Promise.race, Promise.allSettled, Promise.any

Ниже — собственные реализации функций, аналогичных стандартным Promise.all, Promise.race, Promise.allSettled, Promise.any. Все функции принимают массив промисов и возвращают новый промис.

---

### promiseAll

- Ожидает выполнение всех промисов, либо завершается при первой ошибке.

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let finished = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (value) => {
          results[i] = value;
          finished++;
          if (finished === promises.length) {
            resolve(results);
          }
        },
        (err) => reject(err)
      );
    });
  });
}
```

---

### promiseRace

- Выполняется, когда любой из переданных промисов завершается (resolve или reject).

```js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
}
```

---

### promiseAllSettled

- Ожидает завершения всех промисов, возвращает массив с результатом каждого (`{status: "fulfilled", value}` или `{status: "rejected", reason}`).

```js
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    let results = [];
    let finished = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(
          (value) => {
            results[i] = { status: 'fulfilled', value };
          },
          (reason) => {
            results[i] = { status: 'rejected', reason };
          }
        )
        .finally(() => {
          finished++;
          if (finished === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
```

---

### promiseAny

- Ожидает первый успешно завершившийся промис (resolve). Если все завершились с ошибкой — возвращает AggregateError.

```js
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let rejections = [];
    let finished = 0;
    if (promises.length === 0) return reject(new AggregateError([], 'All promises were rejected'));
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (value) => resolve(value),
        (reason) => {
          rejections[i] = reason;
          finished++;
          if (finished === promises.length) {
            reject(new AggregateError(rejections, 'All promises were rejected'));
          }
        }
      );
    });
  });
}
```

---

### Пример использования

```js
const ok = (val) => new Promise((res) => setTimeout(() => res(val), 100));
const bad = (val) => new Promise((_, rej) => setTimeout(() => rej(val), 100));

// promiseAll
promiseAll([ok(1), ok(2)]).then(console.log); // [1, 2]

// promiseRace
promiseRace([ok('a'), bad('fail')]).then(console.log, console.error); // "a"

// promiseAllSettled
promiseAllSettled([ok(1), bad('e')]).then(console.log);
// [ { status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'e' } ]

// promiseAny
promiseAny([bad('e1'), ok(42), bad('e2')]).then(console.log); // 42
promiseAny([bad('x'), bad('y')]).catch((e) => console.log(e.errors)); // ["x", "y"]
```

## Связь промисов с async/await

- Синтаксис async/await — это “сахар” над промисами.
- Любая async-функция возвращает промис.

```js
async function main() {
  try {
    const data = await fetch('/data.json');
    const json = await data.json();
    console.log(json);
  } catch (e) {
    console.error('Ошибка:', e);
  }
}
main();
```

---

## Интересные детали и фишки

- then/catch/finally можно вызывать сколько угодно раз — цепочки не ограничены.
- Если в then или catch выбросить исключение — управление переходит в следующий catch.
- Promise.all отрабатывает reject, если хоть один промис завершился ошибкой.
- Можно использовать промисы для таймеров, работы с сетью, файловой системой (в Node.js), анимаций.
- Для контроля конкуренции (ограничения одновременных запросов) используют сторонние утилиты (например, p-limit).

---

## Типичные ошибки и подводные камни

- Не вернуть промис из then (или забыть return) — цепочка прервётся.
- Ошибка внутри then без catch не будет обработана.
- Использование промисов с “старым” API, который не поддерживает промисы, требует обёртывания (promisify).
- Promise.all прекращает выполнение при первой ошибке (используйте allSettled, если нужно дождаться всех).
- Перемешивание промисов и callback-ов усложняет код.

---

## Ссылки на документацию и полезные ресурсы

- [MDN: Promise](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Learn JavaScript: Промисы](https://learn.javascript.ru/promise)
- [MDN: async/await](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/async_function)
