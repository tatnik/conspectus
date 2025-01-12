# Методы работы с датой/временем

## Инициализация

- объекты **Date** могут быть созданы только путём вызова функции `Date()` в качестве конструктора (c `new`)
- обычный вызов функции (без `new`) вернёт строку вместо объекта **Date**
- если функция `Date()` вызывается в качестве конструктора с более чем одним аргументом, то указанные аргументы интерпретируются как **локальное время**
- если аргументы указывают время в **UTC**, необходимо использовать `new Date(Date.UTC(...))` с теми же аргументами.
- если значение передаваемого параметра выходит за пределы ожидаемого диапазона, будут скорректированы другие параметры даты (увеличится месяц или год и т.п.)

```js
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minute[, second[, millisecond]]]]]);


new Date(1682452849453);
new Date('2025-01-25');
new Date('2025-01-25T01:10:02');

new Date(2025, 0, 25, 1, 10, 2, 5);
// последний параметр (5) - милисекунды
// отсчет номера месяца начинается с 0 !!

new Date(0, 0, 0, 0, 0, 0); // Sun Dec 31 1899 00:00:00 GMT+023
new Date(0, 0, 1, 0, 0, 0); // Mon Jan 01 1900 00:00:00 GMT+0230

// день = 0 смещает дату на последний день предыдущего месяца

console.log(Date());
Sun Jan 12 2025 13:29:57 GMT+0300 (Москва, стандартное время)

```

## Преобразования

```js
date.toString(); // Sun Jan 12 2025 11:54:17 GMT+0300
date.toUTCString(); // Sun, 12 Jan 2025 08:54:31 GMT
date.toTimeString(); // 11:54:45 GMT+0300
date.toDateString(); // Sun Jan 12 2025
date.toISOString(); // 2025-01-12T08:57:33.443Z
date.toLocaleString(); // 12.01.2025, 11:58:16
date.toLocaleTimeString(); // 11:58:37
date.toLocaleTimeString('en-US'); // 11:59:14 AM
date.toLocaleDateString('en-US'); // 1/12/2025
date.toLocaleDateString('ru-RU'); // 12.01.2025

date.toJSON(); // 2025-01-12T09:40:26.078Z //используется форматирование toISOString

date.valueOf(); // 1736672493608;
Date.now(); // 1736672493608;

Date.parse('04 Dec 1995 00:12:00 GMT'); // 818035920000
```

## GET - методы

```js
date.getFullYear();
date.getMonth(); // отсчет номера месяца начинается с 0 !!
date.getDate();
date.getDay(); //порядковый номер дня недели по местному времени,  0 - воскресенье
date.getMonth();
date.getHours();
date.getMinutes();
date.getSeconds();
date.getMilliseconds();
date.getTime();
date.getTimezoneOffset();

date.getUTCFullYear();
date.getUTCMonth();
date.getUTCDate();
date.getUTCDay();
date.getUTCHours();
date.getUTCMinutes();
date.getUTCSeconds();
date.getUTCMilliseconds();
date.getUTCTime();
```

## SET - методы

- устанавливают дату/время по **местному** времени (или по **UTC**)
- возвращают количество миллисекунд от начала эпохи (1 января 1970 00:00:00 UTC) для полученного значения объекта
- если значение передаваемого параметра выходит за пределы ожидаемого диапазона,
  метод попытается обновить другие параметры даты (увеличится месяц или год и т.п.)
- если значения необязательных параметров не указаны, будут использоваться значения,
  возвращаемые методом `getDate()`
- **отсчет номера месяца начинается с 0 !!**

```js
const date = new Date();
date.setFullYear(2025, 12, 1); //1767258837766
console.log(date); // Thu Jan 01 2026 12:13:57 GMT+030
```

```js
dateObj.setFullYear(yearValue[, monthValue[, dayValue]]);
dateObj.setMonth(monthValue[, dayValue]);
dateObj.setDate(dayValue);
dateObj.setHours(hoursValue[, minutesValue[, secondsValue[, msValue]]]);
dateObj.setMinutes(minutesValue[, secondsValue[, msValue]]);
dateObj.setSeconds(secondsValue[, msValue]);
dateObj.setMilliseconds(msValue);
```

для UTC используются методы `setUTCFullYear` и т.п.

```js
date.setTime(1736592863814);
```

## Библиотеки для работы с датами

[https://date-fns.org/](https://date-fns.org/)

[https://github.com/formkit/tempo](https://github.com/formkit/tempo)

[https://momentjs.com/](https://momentjs.com/)
