# Типы, интерфейсы

## Проверка типа, оператор **typeof**

возвращает тип переменной в качестве строки:
"string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function"

```js
let sum: any;
sum = 1200;

if (typeof sum === 'number') {
  let result: number = sum / 12;
  console.log(result);
} else {
  console.log('invalid operation');
}
```

## Явное преобразование типов

```js
const input = <HTMLInputElement>document.getElementById('id0');
```

или

```js
const input = document.getElementById('id0') as HTMLInputElement;
```

К слову: _getElementById, querySelector, querySelectorAll_ — всегда возвращают элемент из DOM-дерева с типом **HTMLElement**, потому что он является родителем всех других элементов
А у типа **HTMLElement** нет свойства _value_, поэтому нужно явно преобразовать тип.

## Объединение типов (операция _'или'_ **|**)

```js
let test: string | number;]
test = 123;
test = 'abc';
```

```js
let str: 'success' | 'error';
```

```js
type UnionUser =
  | {
      username: string,
      password: string,
    }
  | {
      type: string,
    };

const user: UnionUser = { username: 'test', type: 'user' }; // достаточно совпадения с одним из объектных типов
```

## Пересечение типов (операция _'и'_ **&**)

```js
type Order = {
  status: 'Created',
};

type OneHundredOrder = Order & {
  cost: 100,
};

const myOrder: OneHundredOrder = {
  status: 'Created',
  cost: 100,
};
```

```js
type IntersectionUser = {
  username: string,
  password: string,
} & {
  type: string,
};

const admin: IntersectionUser = {
  // требуется совпадение c объектным типом и слева и справа от оператора &
  username: 'test',
  password: 'test',
  type: 'admin',
};
```

Когда при пересечении объектных типов встречаются поля с одинаковыми именами, то в результате типы этих полей будут также пересечены, и итоговый тип будет never.

## Псевдонимы типов

```js
type str = string;
let test: str = 'abc';

type stumber = string | number;
test = 123;
test = 'abc';

type message = 'success' | 'error';
let str: message;
str = 'success';
```

для функций:

```js
type Func = (x: number, y: number) => number;

let func1: Func = function (a: number, b: number): number {
  return a + b;
};
```

для обЪектов:

```js
type User = {
  firstName: string,
  pointsCount: number,
  count(coll: number[]): number, // метод!
};

type User = {
  firstName: string,
  pointsCount: number,
  // Типы взяты для примера
  count(coll: (v: string) => string): number, // колбэк!
};
```

## Приведение типов

```js
let num = 1; // Неявное восходящее приведение
let one: number = 1; // Явное восходящее приведение

let two = num as 2; // Явное нисходящее приведение

let three = 3 as const; // Приведение к литеральному типу — нисходящее
```

Когда мы присваиваем значение в переменную или передаем аргументы в функцию, TypeScript пытается сделать восходящее приведение — от подтипа к базовому

Приведение базового типа к подтипу делается явно с помощью ключевого слова as. При таком поведении TypeScript принимает приведение типов за истину. В некоторых случаях это может привести к ошибке. Поэтому нисходящее приведение считается небезопасным

## Структурная (утиная) типизация

\ — принцип, который определяет совместимость типов на основе их описания (структуры). Переменная типа A также может использоваться в том месте, где ожидается тип B, если обладает той же или более широкой структурой.

## Перегрузка функций

```js
function concat(a: number, b: number): string;
function concat(a: string, b: string): string;

function concat(a: unknown, b: unknown): string {
  if (typeof a === 'number' && typeof b === 'number') {
    return `${a.toFixed()}${b.toFixed()}`;
  }

  return `${a}${b}`;
}
```

или

```js
const concat: {
  (a: number, b: number): string;
  (a: string, b: string): string;
} = (a: unknown, b: unknown) => {
  ...
}
```

при разном количестве и порядке параметров:

```js
function newYearCongratulate(name: string): string;
function newYearCongratulate(year: number, name: string): string;
function newYearCongratulate(data1: string | number, data2?: string): string {
  if (typeof data1 === 'number') {
    return `Hi ${data2}! Happy New Year ${data1}!`;
  }

  return `Hi ${data1}! Happy New Year!`;
}
```

## Интерфейсы

позволяют создавать новые типы данных, описывающие структуру объекта

```js
interface User {
  name: string;
  age: number;
}

interface Product {
  name: string;
  colors: string[];
}
```

Объекты могут содержать в себе другие объекты, описывающиеся отдельными интерфейсами:

```js
interface City {
  name: string;
}

interface User {
  name: string;
  age: number;
  city: City;
}
```

Можно использовать специальную индексную сигнатуру, которая позволяет описать типы возможных значений:

```js
interface IPhoneBook {
  [index: string]: number;
}

const myNotePad: IPhoneBook = {
  ivan: 55531311,
  sergey: 55500110,
  mom: 55522111,
};
```

## Возможности, которые есть у интерфейсов, но нет у типов:

### Декларативное расширение (мерджинг, слияние деклараций)

Если мы объявим два интерфейса с одинаковыми именами, то TypeScript автоматически "сплюснет" их в один.
И теперь при использовании данного интерфейса TypeScript требует чтобы у объекта были свойства и из первого интерфейса и из второго.

```js
interface IUser {
  rating: number;
}

interface IUser {
  nickname: string;
  birthdate: number;
}

const sergey: IUser = {
  nickname: 'Sergey',
  birthdate: 1990,
  rating: 1102,
};
```

### Расширение интерфейсов

Расширением интерфейса называется процесс, когда один интерфейс поглощает все свойства родителя и добавляет свои (работает как пересечение множеств).

```js
interface Person = {
  name: string,
  surname: string,
};

interface Programmer = extends Person {
  skills: string[],
};

const John: Programmer = {
  name: 'John',
  surname: 'Bill',
  skills: ['javascript', 'typescript', 'html', 'css'],
};
```

Интерфейсы могут расширять сразу несколько других интерфейсов.

```js
interface IFlying {
  canFly: true;
}

interface IBird extends IFlying {
  isLiving: true;
}

interface IPlane extends IFlying {
  canCarryPeople: true;
}

interface ISuperMan extends IBird, IPlane {
  guessWho(val: string): string;
}
```

### Перекрестные типы

TypeScript позволяет нам создавать перекрестные типы (_intersection types_) из нескольких интерфейсов c помощью литерала **&**:

```js
interface IOneWay {
  one: string;
}

interface IOrAnother {
  another: string;
}

type OneWayOrAnother = IOneWay & IOrAnother;

const example: OneWayOrAnother = {
  one: 'A',
  another: 'B',
};
```
