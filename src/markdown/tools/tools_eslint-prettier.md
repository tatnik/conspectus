# Базовые настройки Prettier и ESLint в TypeScript проекте

## Установка необходимых зависимостей

- Node.js и npm предварительно должны быть установлены.

- далее в терминале:

```
npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier
```

## Настройка ESLint

- cоздайть файл `.eslintrc.json` в корне проекта

- добавить в него следующий код:

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  "plugins": ["@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## Настройка Prettier

- создать файл `.prettierrc` в корне проекта

- добавьте в него необходимые настройки. Например:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## Скрипты для проверки и форматирования кода

- в файл `package.json` добавить следующие скрипты:

```json
"scripts": {
  "lint": "eslint . --ext .ts",
  "format": "prettier --write \"**/*.ts\""
}
```

## Выполнение проверки и форматирования

```
npm run lint
npm run format
```
