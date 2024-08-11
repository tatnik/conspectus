# Основы

**JavaScript** - это динамический язык программирования, который был придуман для создания интерактивных веб-страниц.

- мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. [Википедия...](https://ru.wikipedia.org/wiki/JavaScript)

Его разработал Брендан Эйх (Brendan Eich, сооснователь проекта Mozilla, Mozilla Foundation и Mozilla Corporation) в компании Netscape в 1995 году как объектный скриптовый язык с открытым стандартом

Сейчас JavaScript продолжает использоваться прежде всего для создания веб-приложений на стороне клиента, только теперь он предоставляет гораздо больше возможностей.

Также он применяется как язык серверной стороны. То есть если раньше JavaScript применялся только на веб-странице, а на стороне сервера нам надо было использовать такие технологии, как PHP, ASP.NET, Ruby, Java, то сейчас благодаря Node.js мы можем обрабатывать все запросы к серверу также с помощью JavaScript.

Также JavaScript может применяться для создания десктопных приложений, для создания приложений для смартфонов и планшетов, для разработки программ для встроенных устройств.

С самого начала существовало несколько веб-браузеров (Netscape, Internet Explorer), которые предоставляли различные реализации языка. И чтобы свести различные реализации к общему стержню и стандартизировать язык в 1996-1997 гг была проведена стандартизация языка ассоциацией _ECMA_. Стандартизированная версия имеет название **ECMAScript**, описывается стандартом **ECMA-262** [Википедия...](https://ru.wikipedia.org/wiki/ECMAScript)

К настоящему времени ECMA было разработано несколько стандартов языка, которые отражают его развитие (ES-5 (2009г.), ES-6 (2015 г.), она же ES-2015) С 2016 года новый стандарт выпускается ежегодно. На данный момент последним принятым стандартом является ECMAScript 2024, который был издан в июле 2024 года.

JavaScript является интерпретируемым языком.

## Типы в JS

### Примитивные

#### boolean:

**true, false**

#### number:

Целые и дробные числа в диапазоне от **-2^53 до 2^53**.

#### string

можно использовать как двойные, так одинарные, так и косые кавычки.

Если внутри строки встречаются кавычки, то их нужно экранировать слешем (или использовать другой тип кавычек)

```js
const company = 'Бюро "Рога и копыта"';
```

косые кавычки позволяют встраивать в строку выражения и создавать многострочный текст.

```js
const user = 'Tom';
const text = `Name: ${user}`;
```

#### symbol

#### null

у переменной отсутствует значение

#### undefined

значение не определено или не установлено

#### BigInt (добавлен в последних стандартах):

используется для очень больших целых чисел, которые выходят за пределы диапазона типа number.

Для определения числа как значения типа BigInt в конце числа добавляется суффикс **n**:

```js
const value = 2545n;
```

### Сложный:

#### object

Объект может иметь различные свойства и методы.

```js
const user = { name: 'Tom', age: 24 };
```

## Оператор _typeof_

С помощью оператора **typeof** можно получить тип переменной

```js
let id;
console.log(typeof id); // undefined
```

для значения _null_ оператор typeof возвращает значение _"object"_

## this

_this_ - это идентификатор, значение которого определяется в момент вызова функции и который совершенно не зависит от того как эта функция определена, как метод или еще как то.

в текущей спецификации языка JS, _this_ может быть установлен либо явным образом используя методы _apply, call, bind_, либо образом при котором функция или метод вызывается как property (dot нотация) обьекта.

```js
obj.prop(); // this будет связан с obj
obj['prop'](); // this будет связан с obj
let func = obj.prop;
func(); // this останется связан со значением, которое было связано с ним до вызова функции. Так как вызов был не в дот нотации. Как и любой другой вызов функции или метода.
```

## SetTimeout

_SetTimeout_ - это API предоставляемое в соответствии со [спецификацией HTML5](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html), и это API никакого отношения к JavaScript не имеет