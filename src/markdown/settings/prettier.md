## Расширение для VSCode prettier-vscode

Prettier — форматировщик кода

Чтобы гарантировать, что это расширение будет использоваться поверх других расширений,
его необходимо установить в качестве средства форматирования по умолчанию в настройках VS Code 
для всех языков или для конкретного языка.
Настройки можно редактировать непосредственно в файле settings.json, открыв его по ссылке:

![Ссылка на файл с настройками](/src/assets/jpg/vscode-settings-json.jpg)

<img src="/src/assets/jpg/vscode-settings-json.jpg" alt="файл настроек"/>

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
## Варианты настройки параметров форматирования:

- настройка через VS Code (настройки **не будут** применять при запуске *prettier* через командную строку)

- файл **.editorconfig**

- файл конфигурации **.prettierrc.js** или **.prettierrc.json** в корне проекта - рекомендуемый вариант

    - настройки будут применяться независимо от того, как будет запущен *prettier*
    - для разных проектов можно иметь разные наборы настроек

Можно создать единую конфигурацию и использовать ее по умолчанию для всех проектов:

`prettier.configPath = ...`

это значение будет использоваться всегда, а локальные файлы конфигурации будут игнорироваться!


## Порядок чтения настроек:

1. .prettierrc

2. .editorconfig

3. настройки VS Code (игнорируются, если есть .prettierrc)


## Виды настроек:

```
prettier.arrowParens
prettier.bracketSpacing
prettier.endOfLine
prettier.htmlWhitespaceSensitivity
prettier.insertPragma
prettier.singleAttributePerLine
prettier.bracketSameLine
prettier.jsxBracketSameLine
prettier.jsxSingleQuote
prettier.printWidth
prettier.proseWrap
prettier.quoteProps
prettier.requirePragma
prettier.semi
prettier.singleQuote
prettier.tabWidth
prettier.trailingComma
prettier.useTabs
prettier.vueIndentScriptAndStyle
prettier.embeddedLanguageFormatting
```
[Подробнее](https://prettier.io/docs/en/options.html)

## Включить форматирование при сохранении:

```json
{
    "editor.formatOnSave": true
}
```
