# ООП в TypeScript

## Объявление класса

```js
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
```

## Cоздание объекта класса:

```js
let user: User = new User('john');
```

## Наследование

```js
class Student extends User {
  course: number;

  constructor(name: string, course: number) {
    super(name);
    this.course = course;
  }
}
```

Наследоваться можно только от одного класса. Но цепочка наследования может быть бесконечной.

При наследовании можно переопределять методы родительского класса. При этом нужно либо сохранить сигнатуру метода, либо соблюдать некоторые правила:

Типы параметров переопределенного метода _бивариантны_

Тип возвращаемого значения переопределенного метода _ковариантен_

Родительский метод принимает _string_ и возвращает _string_. Переопределенный метод должен иметь более широкий или более узкий тип, например, _string | null_ или '_some string_'. Возвращать же должен более узкий тип, например, '_some string_':

[Про разные типы вариантности...](https://habr.com/ru/articles/477448/)

## Модификаторы доступа

### public, private, protected

```js
class User {
	private name: string;

	constructor(name: string) {
		this.name = name;
	}

	public getName() {
		return this.name; // прочитаем свойство
	}

	public setName(name: string) {
		this.name = name; // запишем новое значение свойства
	}
}

let user: User = new User('john');

```

- изменить приватное свойство _user.name_ можно только через публичный сеттер `user.setName('eric')`

- приватные свойства и методы не наследуются потомками

- метод, объявленный как защищенный, можно использовать внутри метода потомка, и нельзя использовать снаружи класса:

```js
class User {
	protected cape(str: string) {
		return str[0].toUpperCase() + str.slice(1);
	}
}

class Student extends User {
	private name: string;

	constructor(name: string) {
		super();
		this.name = name;
	}

  public showName(): string {
		return this.cape(this.name); // используем метод родителя
	}
}
let student: Student = new Student('john');
console.log(student.showName()); // John
console.log(student.cape('test')); // ошибка
```

### readonly

делает свойство доступным только для чтения

```js
class User {
	readonly name: string;

	constructor(name: string) {
		this.name = name;
	}
}
```

## Заполнение свойств из параметров

можно делать автоматически в конструкторе:

```js
class CustomFile {
	  // создаются и заполняются свойства name и size
    constructor(private name: string, private size:number){ }

    toString(): string {
        return `${this.name} (${this.size} bytes)`;
    }
}

```

## Аксессоры свойств

в отличие от JS имена аксессоров не могут совпадать с именами свойств,
можно переименовать приватное свойство:

```js
class User {
	private _name: string = '';

	public set name(name: string) {
		this._name = name;
	}

	public get name(): string {
		return this._name;
	}
}
```

## Статические свойства и методы (static)

- принадлежат классу, а не объекту

- их можно вызывать без создания объекта

- они будут общими для разных объектов

```js
class User {
	public name: string;
	public static salary: number = 1000;

	constructor(name: string) {
		this.name = name;
	}
}

console.log(User.salary); // 1000
```

обращение к статическому свойству внутри класса такое же, как и снаружи:

```js
class User {
	public name: string;
	public static salary: number = 1000;

	constructor(name: string) {
		this.name = name;
	}

	getSalary(): number {
		return User.salary;
	}

	setSalary(salary: number) {
		User.salary = salary;
	}
}
```

статический метод:

```js
class Calc {
	public static getSum(arr: number[]): number {
		let sum: number = 0;

		for (let elem of arr) {
			sum += elem;
		}

		return sum;
	}
}

let num: number = Calc.getSum([1, 2, 3, 4, 5]);
```

Статическим методам и свойствам также можно назначить модификаторы доступа*public, protected, private* и модификатор неизменяемости _readonly_. Это позволяет ограничить использование свойств и методов только текущим классом или наследниками.

В отличии от JavaScript в TypeScript статические свойства и методы не могут быть переопределены в подклассах.

## Абстрактные классы

- используется для группировки общих свойств и методов

- от него запрещено создавать объекты

```js
abstract class User {
	public name: string;

	constructor(name: string) {
		this.name = name;
	}
}

class Student extends User {
	public course: number;

	constructor(name: string, course: number) {
		super(name);
		this.course = course;
	}
}

class Employee extends User {
	public salary: number;

	constructor(name: string, salary: number) {
		super(name);
		this.salary = salary;
	}
}

```

## Классы как типы

Класс в TypeScript является одновременно значением и типом данных.
При сравнении типов TypeScript сравнивает их структуру, а не имена.

Ниже в качестве типа используется класс Point, но передавать в функцию _sEqual_ мы можем любые объекты с полями x и y:

```js
class Point {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;

    this.y = y;
  }
}

function isEqual(p1: Point, p2: Point): boolean {
  return p1.x === p2.x && p1.y === p2.y;
}

isEqual({ x: 1, y: 2 }, { x: 1, y: 2 }); // OK
```

НО!!! **TypeScript будет явно требовать экземпляр класса, если у него есть приватные поля**:

```js
class Point {
  private x: number;

  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isEqual(p2: Point): boolean {
    return this.x === p2.x && this.y === p2.y;
  }
}

const point = new Point(1, 2);
point.isEqual(new Point(10, 1)); // OK
point.isEqual({ x: 1, y: 2}); // Error: Argument of type '{ x: number; y: number; }' is not assignable to parameter of type 'Point'.
```
