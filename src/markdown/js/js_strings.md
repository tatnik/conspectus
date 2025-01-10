# Строковые методы

## длина строки

```js
'JS development'.length; // 10
```

## преобразование регистра

```js
'JS development'.toLowerCase(); // 'js development'
'JS development'.toUpperCase(); // 'JS DEVELOPMENT'
```

## вырезка

```js
'JS development'[3]; // 'd'

'JS development'.charAt(5); // 'v'
'JS development'.charCodeAt(5); // 118
```

```js
'JS development'.slice(3, 5); // 'de'
'JS development'.slice(3, -4); // 'develop'
'JS development'.slice(10); // 'ment'
'JS development'.slice(-4); // 'ment'
'JS development'.slice(-4, -2); // 'me'
'JS development'.slice(30); // ''
'JS development'.slice(3, 0); // ''
```

```js
'JS development'.substring(3, 6); // 'dev'
```

Работает аналогично slice, НО
если первый индекс больше второго, он меняет их местами:

```js
'JS development'.substring(6, 3); // 'dev'
```

Если один или оба аргумента отрицательны или NaN, метод обрабатывает их так, как если бы они были равны 0

```js
'JS development'.substring(-3, 2); // 'JS'
```

## объединение / разделение

```js
'JS development'.concat(' forever'); // 'JS development forever'
```

```js
'JS development'.split(' '); // ['JS', 'development']
```

## поиск

```js
'JS development'.includes('JS'); // true
```

```js
'JS development'.startWith('J'); // true
'JS development'.endWith('t'); // true
```

```js
'JS development forever'.indexOf('for'); //15
'JS development forever'.indexOf('ve', 10); // 19
'JS development forever'.indexOf('js'); // -1  (не найдено)
```

отрицательный индекс заменяется нулём:

```js
'JS development forever'.indexOf('ve', -1); // 5,
```

```js
'JS development forever'.lastIndexOf('ve'); // 19
```

```js
'JS development forever'.search('for'); //15
'JS development forever'.search(/[a-z]/); // 3
```

## замена

```js
'JS development'.replace('development', 'forever'); // 'JS forever'
'JS development'.replaceAll('e', 'E'); // 'JS dEvElopmEnt'
```

## обрезка

```js
' JS development '.trim(); // 'JS development'
' JS development '.trimStart(); // 'JS development '
' JS development '.trimEmn(); // ' JS development'
```

## дополнение

```js
'JS'.padStart(5, '*'); // '***JS'
'JS'.padEnd(5, '*'); // 'JS***'
```

## клонирование

```js
'JS'.repeat(3); // 'JSJSJS'
```
