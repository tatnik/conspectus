# TypeScript основы

Тип данных - это множество всех значений и набор допустимых операций над ними

## Базовые типы данных

### boolean

```js
let isEnabled: boolean = true;
let isAlive: boolean = false;
```

### number

```js
let age: number = 36;
let height: number = 1.68;

// шестнадцатиричная система
let hex: number = 0xf00d; // 61453 в десятичной
// двоичная система
let binary: number = 0b1010; // 10 в десятичной
// восьмиричная система
let octal: number = 0o744; // 484 в десятичной
```

### bigint (числа > 2^53 - 1)

```js
const num1: bigint = BigInt(100);
const num2: bigint = 100n;
```

этот тип - часть стандарта ES2020, поэтому при компиляции следует установить данный стандарт в качестве целевого через параметр target. Например, в файле tsconfig.json:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "outFile": "app.js"
  }
}
```

### string

```js
let firstName: string = 'Tom';
let lastName = 'Johns';
let info: string = `Имя ${firstName}    Возраст: ${age}`;
```

### any

Тип **any** отключает проверку типов и позволяет выполнять любые операции со значением, например, обращаться к свойствам переменной.

```js
var someArray: any[] = [24, 'Tom', false];

let x; // тип any
x = 10;
x = 'hello';
```

### unknown

Тип unknown — это надмножество всех доступных типов. Он позволяет присвоить переменной значение произвольного типа.
Но в отличие от _any_ запрещает обращаться к свойствам переменной и требует предварительной приверки типа переменной либо привидения к нужному типу.

```js
let unknownValue: unknown = 1;

unknownValue = 2; // OK
unknownValue = false; // OK
unknownValue = 'string'; // OK

unknownValue.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'unknown'.
```

При объединении любых типов с _unknown_ мы всегда получаем _unknown_. Такое поведение объясняется тем, что unknown — это надмножество всех типов, поэтому любое объединение с ним дает его само. Исключением тут является any, который и в этом случае отключает проверку типов и не подчиняется модели типов как множеств.

### never

для функции, не завершающейся до окончания выполнения программы или если она кидает ошибку
этот тип не разрешает помещать в себя значения

_never_ соответствует пустому множеству — тип, у которого нет ни одного значения.

## Array

```js
let arr: string[] = ['a', 'b', 'c', 'd', 'e'];

let arr: Array<string> = ['a', 'b', 'c', 'd', 'e'];
```

для составных типов, объединения или описания объекта может использоваться аннотация(описание) типа
в круглых скобках

```js
const users: { name: string }[] = [];
const users: (string | null)[] = [];
const users: (User | null | { name: string })[] = [];
```

пустой массив всегда надо типизировать явно, иначе его тип будет _any_

```js
const items: Array<number> = [];
```

для многомерных массивово используется синтаксис Type[][]:

```js
const items1: number[][] = [];

const items2: Array<number[]>;

const users: User[][];

const users: Array<User[]>;

const coll: (string | number)[][] = [];

const coll: Array<Array<string | number>> = [];
```

массив только для чтения должен помечаться как _readonly_ или иметь тип ReadonlyArray

```js
const items: readonly ({ key: string })[] = [{ key: 'value'}];
items[0].key = 'another value'; // ok!

const items: ReadonlyArray<{ key: string }> = [{ key: 'value'}];
```

объекты внутри такого массива менять не запрещено

## Кортеж

\- это фиксированный массив, каждый элемент которого имеет жестко заданный тип

```js
let user: [string, number] = ['john', 31];

let user: readonly [string, number] = ['john', 31]; // кортеж только для чтения

let user: [string, number, boolean?]; // третий элемент необязательный

let user: [string, number] = ['john', 31];
let [name, age] = user; // деструктуризация кортежа

let tpl: [string, ...number[]]; // строка и произвольное количество чисел
tpl = ['str', 1, 2, 3, 4, 5];
```

## Enum

```js
enum Season { Winter, Spring, Summer, Autumn };
let currentValue: string = Season[0]; // Winter
let currentKey: number = Season.Winter; //0
```

по умолчанию для каждого элемента генерируются ключи начиная с 0

ключи можно задать явно:

```js
enum Season { Winter = 1, Spring = 2, Summer = 3, Autumn = 4 };
```

можно указать только начальный ключ, далее пойдут по порядку:

```js
enum Season { Winter = 1, Spring, Summer, Autumn };
```

ключами могут быть строки:

```js
enum Season {
	Winter = 'Зима',
	Spring = 'Весна',
	Summer = 'Лето',
	Autumn = 'Осень'
};
```

Перечисление — это и значение, и тип. Его можно указывать как тип в параметрах функции.

## Symbol

используется для создания глобально уникальных ссылок с помощью функции Symbol()

## Void

используется для выходного значения функции, когда она ничего не возвращает
(на самом деле возвращается _undefined_)

в void можно поместить undefined

```js
const foo: void = undefined;
```

## Date

```js
let date: Date;

let date: Date = new Date(); // текущий момент времени

let date: Date = new Date(2030, 11, 31); // указанный момент времени
```

## RegExp

```js
let reg: RegExp;

let reg: RegExp = /.+?/;

let reg: RegExp = new RegExp('.+?');
```

## HTMLElement

```js
let elem: HTMLElement;

let elem: HTMLElement = document.querySelector('div');

let elem: HTMLDivElement = document.querySelector('div');
```

## Типы для функций

```js
function func(a: number, b: number): number {
  return a + b;
}

function func(test: string): void {
  alert(test);
}
```

функция с необязательным параметром _last_ (по ум. undefined)

```js
function func(first: string, last?: string) {
  if (last) {
    return first + ' ' + last;
  } else {
    return first;
  }
}
```

необязательным параметрам можно назначать значения по умолчанию

```js
function func(first: string, last: string = 'snow') {
  return first + ' ' + last;
}
```

можно использовать _rest_-параметры:

```js
function func(...rest: number[]): number {
  console.log(rest);
}

func(1, 2, 3); // выведет [1, 2, 3]
```

назначение переменной типа функции:

```js
let func: (x: number, y: number) => number;
```

```js
let func: (x: number, y: number) => number = function (a: number, b: number): number {
  return a + b;
};
```

для стрелочных функций:

```js
let func = (num: number): number => num ** 2;
```

для функций-коллбэков:

```js
function make(num: number, func: (num: number) => number): number {
  return func(num);
}

make(3, function (num: number): number {
  return num ** 2;
});

make(3, function (num: number): number {
  return num ** 3;
});
```

```js
function process(callback: () => string[])
function process(callback: () => { firstName: string; })
```

_В описании типов коллбек-функции всегда должно присутствовать максимально возможное количество параметров и они НЕ ДОЛЖНЫ помечаться как необязательные. Колбеки с меньшим числом параметров всегда могут появляться там, где они же ожидаются с большим числом параметров._

```js
function filter(coll: number[], callback: (arg: number, index: number) => boolean) {
  // ...
}

// Выполнится без ошибок
filter([1, 2], (n) => n > 1);
filter([1, 2], (n, index) => index > n);
```

[Подробнее...](https://code-basics.com/ru/languages/typescript/lessons/optional-parameters-in-callbacks#solution)

для деструктурируемых параметров:

```js
function foo([x, y]: number[])

function f({ firstName, age }: { firstName: string, age: number })
```

## Типизация объектов

```js
let user: { name: string, age: number };
user = { name: 'john', age: 30 };

let user: { name: string, age: number } = { name: 'john', age: 30 };
```

свойства могут быть необязательными:

```js
let user: { name: string, age?: number };
user = { name: 'john' };
```

массивы объектов:

```js
let arr: HTMLElement[] = [];

let lst: NodeList = document.querySelectorAll('div');
let arr: HTMLElement[] = Array.from(lst);
```

Чтобы принять объект в функцию как параметр, нужно указать его структуру в описании функции:

```js
// Свойства в описании типа разделяются через запятую (,)
function doSomething(user: { firstName: string, pointsCount: number }) {
  // ...
}
```

Ни null, ни undefined по умолчанию не разрешены. Чтобы изменить это поведение, нужно добавить опциональность:

```js
// firstName может быть undefined
// pointsCount может быть null
function doSomething(user: { firstName?: string, pointsCount: number | null }) {
  // ...
}
```

**Пустой объектный тип {}** подразумевает под собой объект любой структуры и ограничивает множество всех значений за исключением _null_ и _undefined_. (Пустой интерфейс работает так же, как и пустой объектный тип)

```js
function toString(obj: {}) {
  return obj.toString();
}

toString('wow'); // Ok!
toString(123); // Ok!
toString({}); // Ok!
```

тип **Object** работает так же, как тип {} с некоторыми отличиями. Он предопределяет типы некоторых встроенных методов, например, _toString()_, а тип _{}_ этого не делает.

```js
const foo: {} = {
  toString() {
    return 1; // Ok!
  },
};

const bar: Object = {
  toString() {
    return 1; // Error! здесь должна быть строка
  },
};
```

тип **object** описывает _непримитивные_ значения.

```js
function toString(obj: object) {
  return obj.toString();
}

toString('wow'); // Error!
toString(123); // Error!
toString({}); // Ok!
```

### Динамические ключи

```js
type dynamicKeysObject = {
  [key: string | number | symbol]: unknown,
};

const obj: dynamicKeysObject = {
  name: 'John',
  age: 30,
  0: 'zero',
  [Symbol('secret')]: 'symbol',
};
```

Динамические ключи можно также использовать совместно с указанными явно полями.

```js
type MyTheme = {
  palette: {
    primary: 'red' | 'green' | 'blue';
    [key: string]: string;
  },
  [key: string]: unknown;
};

const theme = {
  palette: {
    primary: 'red',
  },
  spacing: {
    small: 8,
  },
} satisfies MyTheme;
```

(_satisfies_ выполняет проверку типа)

Тип ключа может также быть и шаблонным литералом (_Template String Literal_)
Например, если мы хотим объявить тип слушателя и потребовать, чтобы все его методы начинались со слова _on_:

```js
type Listeners = {
  [key: `on${string}`]: (value: unknown) => void
}

const streamListeners: Listeners = {
  onStart() {},
  onFinished() {}
}
```
