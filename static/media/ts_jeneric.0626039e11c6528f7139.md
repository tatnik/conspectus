# Дженерики

## Дженерики - функции

Дженерики - это механизм, позволяющий создать такие функции, которые имеют одинаковую логику обработки для разных типов данных.

т.е. дженерики — это реализация параметрического полиморфизма в TypeScript.

```js
// или так
// function merge<T>(coll1: T[], coll2: T[]): T[]
function merge<T>(coll1: Array<T>, coll2: Array<T>): Array<T> {
  // Тело функции не поменялось!
  const result = [];
  result.push(...coll1);
  result.push(...coll2);
  return result;
}

// Работает с массивами любых типов
// Сами массивы должны иметь совпадающий тип
merge([1, 2], [3, 4]); // [1, 2, 3, 4]
merge(['one', 'two'], ['three']); // ['one', 'two', 'three']
```

**<T>** после имени функции говорит о том, что перед нами дженерик, который параметризуется типом **T**
Что конкретно скрывается под типом с точки зрения кода дженерика — не важно. Это может быть объект, число, строка или булево значение.

Запись **Array<T>** описывает обобщенный массив — тоже дженерик, но уже для типа. На месте этого параметра может оказаться любой массив, например, _number[]_ или _boolean[]_. Соответственно, в коде функции мы говорим о том, что ожидаем на вход два массива одного типа, и этот же тип является выходным.

```js
//описание обощенного типа MyArray,
//который представляет аналог массива из JavaScript
//тип включает в себя два метода: push() и filter(),
//совпадающие по сигнатуре с методами Array
type MyArray<T> = {
  items: Array<T>,
  push(item: T): number,
  filter(callback: (item: T, index: number, arr: Array<T>) => boolean): MyArray<T>,
};
```

## Ограничения дженериков

например, тип, который передается в дженерик, должен реализовывать какой-то интерфейс:

```js
interface HasId {
  id: number;
}

type MyColl<T extends HasId | number> = {
  data: Array<T>;
  forEach(callback: (value: T, index: number, array: Array<T>) => void): void;
  at(index: number): T | undefined;
}
```

Это позволяет нам использовать тип MyColl только с типами, которые реализуют интерфейс HasId.

## Асинхронные функции

```js
// асинхронный вариант функции map()
const asyncMap = async <T, U>(arr: Promise<T>[], callback: (val: T, index: number) => U) => {
  const promises = arr.map(async (val, index) => {
    const res = await val;
    return callback(res, index);
  });
  return Promise.all(promises);
};
```

## Дженерики на классах

позволяют создавать обобщенные классы, которые могут работать с разными типами данных.

```js
class Triple<T, U, V> {
  constructor(protected first: T, protected second: U, protected third: V) {}

  getFirst(): T {
    return this.first;
  }

  getSecond(): U {
    return this.second;
  }

  getThird(): V {
    return this.third;
  }
}
```

От таких классов можно наследоваться.

```js
// используется приведение к типу never, чтобы пометить третий параметр как отсутствующий.

class Pair<T, U> extends Triple<T, U, never> {
  constructor(first: T, second: U) {
    super(first, second, undefined as never);
  }

  getFirst(): T {
    return this.first;
  }

  getSecond(): U {
    return this.second;
  }
}
```

Как и обычные классы, обобщенные классы также можно использовать в качестве типов параметров функций.

```js
function swap<T, U>(pair: Pair<T, U>): Pair<U, T> {
  return new Pair(pair.getSecond(), pair.getFirst());
}
```
