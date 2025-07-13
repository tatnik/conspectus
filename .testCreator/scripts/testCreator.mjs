import config from '../testCreator.config.mjs';
import propsMap from '../testCreator.propsMap.mjs';
import fs from 'fs-extra';
import path from 'path';
import fg from 'fast-glob';
import inquirer from 'inquirer';

const {
  COMPONENT_EXTS,
  TEST_SUFFIX,
  TEMPLATE_PATH,
  ROOT_DIRS,
  EXCLUDE_NAME,
  ON_EXISTS,
  RENDER_FUNCTION,
} = config;

/**
 * Преобразует любое JS-значение в корректный JSX-литерал для передачи в пропс.
 * - Строки оборачиваются в кавычки
 * - undefined/null — явно в фигурные скобки
 * - Числа/boolean — фигурные скобки
 * - Функции — заглушка
 * - Массивы и объекты — рекурсивно сериализуются, вложенные объекты не получают лишних скобок
 */
function jsxValue(val) {
  if (val === undefined) return '{undefined}';
  if (val === null) return '{null}';
  if (typeof val === 'string') {
    // если это js-выражение, не оборачивать в кавычки!
    if (/^jest\.fn\(\)$/.test(val) || /^\(\)\s*=>\s*{.*}$/.test(val)) {
      return `{${val}}`;
    }
    return `"${val.replace(/"/g, '\\"')}"`;
  }
  if (typeof val === 'number' || typeof val === 'boolean') return `{${val}}`;
  if (typeof val === 'function') return '{() => {}}';
  if (Array.isArray(val)) {
    const arr = val.map(jsxValueForObject).join(', ');
    return `{[${arr}]}`;
  }
  if (typeof val === 'object') {
    // --- используем дополнительную функцию, чтобы не добавлять лишние фигурные скобки ---
    return `{${objectToJSX(val)}}`;
  }
  return `{${JSON.stringify(val)}}`;
}

/**
 * Сериализация значения для вложенных объектов/массивов:
 * - Не добавляет фигурные скобки вокруг объекта (нужно для вложенности в массиве/объекте)
 */
function jsxValueForObject(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') {
    // если это js-выражение, не оборачивать в кавычки!
    if (/^jest\.fn\(\)$/.test(val) || /^\(\)\s*=>\s*{.*}$/.test(val)) {
      return `{${val}}`;
    }
    return `"${val.replace(/"/g, '\\"')}"`;
  }
  if (typeof val === 'number' || typeof val === 'boolean') return `${val}`;
  if (typeof val === 'function') return '() => {}';
  if (Array.isArray(val)) {
    return `[${val.map(jsxValueForObject).join(', ')}]`;
  }
  if (typeof val === 'object') {
    return objectToJSX(val);
  }
  return JSON.stringify(val);
}

/**
 * Преобразует простой JS-объект в строку вида:
 *   id: 0, name: "", path: ""
 * Используется для генерации строк вложенных пропсов
 */
function objectToJSX(obj) {
  return `{${Object.entries(obj)
    .map(([k, v]) => `${k}: ${jsxValueForObject(v)}`)
    .join(', ')}}`;
}

/**
 * Пытается загрузить behavior-конфиг для компонента, если он существует рядом с файлом.
 * Возвращает объект behavior или null.
 */
async function tryLoadBehavior(componentPath) {
  const dir = path.dirname(componentPath);
  const base = path.basename(componentPath, path.extname(componentPath));
  // Ищем и .cjs, и .mjs, и .js
  const behaviorFiles = [
    path.join(dir, `${base}.behavior.cjs`),
    path.join(dir, `${base}.behavior.mjs`),
    path.join(dir, `${base}.behavior.js`),
  ];
  for (const behaviorPath of behaviorFiles) {
    if (await fs.pathExists(behaviorPath)) {
      // В ESM import всегда async, и результат — {default: ...}
      const behavior = await import(
        behaviorPath.startsWith('file://') ? behaviorPath : 'file://' + behaviorPath
      );
      return behavior.default || behavior;
    }
  }
  return null;
}

/**
 * Генерирует тестовый файл для компонента:
 * - Читает шаблон
 * - Формирует строку пропсов (с поддержкой моков типа __JEST_FN__)
 * - Подставляет значения в шаблон
 * - Проверяет существование файла (поведение зависит от ON_EXISTS: skip, ask, overwrite)
 * - Создаёт или перезаписывает файл
 */
async function generateTestFile(componentPath, template, testFilePath, componentName) {
  if (await fs.pathExists(testFilePath)) {
    if (ON_EXISTS === 'skip') return;
    if (ON_EXISTS === 'ask') {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: `Файл ${path.relative('.', testFilePath)} уже существует. Что делать?`,
          choices: [
            { name: 'Пропустить', value: 'skip' },
            { name: 'Перезаписать', value: 'overwrite' },
          ],
        },
      ]);
      if (action === 'skip') return;
    }
    // Если 'overwrite' — ничего не спрашиваем, перезаписываем
  }

  // ======= Импорты и дополнительные тесты из behavior =======
  let importLines = '';
  let customTests = '';
  let behaviorProps = null;
  let jestMocksBlock = '';
  // ----- Пробуем загрузить behavior-файл -----
  const behavior = await tryLoadBehavior(componentPath);

  if (behavior) {
    // ----- Импорты для тестов -----
    if (behavior.imports && Array.isArray(behavior.imports)) {
      importLines = behavior.imports.join('\n') + '\n';
    }
    // ----- Пропсы из behavior (переопределяют propsMap) -----
    if (behavior.props && typeof behavior.props === 'object') {
      behaviorProps = behavior.props;

      // ----- Автоматически объявляем jest.fn() для всех пропсов с маркером __JEST_FN__ -----
      Object.entries(behaviorProps).forEach(([key, value]) => {
        if (value === '__JEST_FN__') {
          jestMocksBlock += `  const ${key} = jest.fn();\n`;
        }
      });
    }
  }

  // ======= Генерация пропсов =======
  // Передаём props с подстановкой mock-функций (не строкой, а переменной)
  const propsStr = generatePropsStr(componentName, behaviorProps, /*useVarsForMocks*/ true);

  // ======= Дополнительные тесты из behavior (добавляем вызов рендера в начало каждого теста) =======
  if (behavior && behavior.tests && Array.isArray(behavior.tests)) {
    customTests =
      '\n' +
      behavior.tests
        .map((test) => {
          // Всегда используем заранее вычисленный propsStr и глобально выбранный RENDER_FUNCTION
          const renderCall = `${RENDER_FUNCTION}(<${componentName} ${propsStr} />);`;
          const stepsIndented = indentLines(`${renderCall}\n${test.steps.trim()}`, 4);
          return `  it('${test.it}', ${test.async ? 'async ' : ''}() => {\n${stepsIndented}\n  });`;
        })
        .join('\n') +
      '\n';
  }

  // ======= Формируем итоговый контент =======
  const content = template
    .replace(/\$\{EXTRA_IMPORTS\}/g, importLines)
    .replace(/\$\{COMPONENT_NAME\}/g, componentName)
    .replace(/\$\{JEST_MOCKS\}/g, jestMocksBlock) // вставляем объявления мок-функций (если есть)
    .replace(/\$\{COMPONENT_PROPS\}/g, propsStr)
    .replace(/\$\{EXTRA_TESTS\}/g, customTests)
    .replace(/\$\{RENDER_FUNCTION\}/g, RENDER_FUNCTION);

  await fs.writeFile(testFilePath, content, 'utf-8');
  console.log(`✅ Сгенерирован: ${testFilePath}`);
}

/**
 * Формирует строку пропсов для компонента, поддерживает генерацию переменных для jest.fn():
 * - useVarsForMocks: если true — значения __JEST_FN__ будут подставляться как handleOnClick={handleOnClick}
 */
function generatePropsStr(componentName, behaviorProps = null, useVarsForMocks = false) {
  const map = behaviorProps || propsMap[componentName];
  if (!map) return '';
  return Object.entries(map)
    .map(([k, v]) => {
      if (useVarsForMocks && v === '__JEST_FN__') return ` ${k}={${k}}`;
      const jsx = jsxValue(v);
      if (jsx === undefined) return '';
      return ` ${k}=${jsx}`;
    })
    .join('');
}

/**
 * Вспомогательная функция для красивых отступов кода в steps доп. тестов.
 */
function indentLines(str, spaces = 2) {
  const pad = ' '.repeat(spaces);
  return str
    .split('\n')
    .map((line) => pad + line)
    .join('\n');
}

/**
 * Главная логика: ищет все компоненты, генерирует по ним тестовые файлы.
 * - Для каждого компонента определяет тестовый файл и путь
 * - Подставляет пропсы, используя propsMap
 * - Поведение при существующем файле регулируется через ON_EXISTS
 */
(async () => {
  const template = await fs.readFile(TEMPLATE_PATH, 'utf-8');
  for (const ROOT_DIR of ROOT_DIRS) {
    const patterns = COMPONENT_EXTS.map((ext) => `**/*.${ext}`);
    const excludePatterns = COMPONENT_EXTS.map((ext) => `**/*${EXCLUDE_NAME}.${ext}`);
    const files = await fg(patterns, { cwd: ROOT_DIR, absolute: true, ignore: excludePatterns });

    for (const file of files) {
      const dir = path.dirname(file);
      const base = path.basename(file, path.extname(file));
      const testFile = path.join(dir, `${base}.${TEST_SUFFIX}`);

      await generateTestFile(file, template, testFile, base);
    }
  }

  console.log('🎉 Готово!');
})();
