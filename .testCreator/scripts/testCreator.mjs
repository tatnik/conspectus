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
 * - Функции — заглушка или inline-функция
 * - Массивы и объекты — рекурсивно сериализуются, вложенные объекты не получают лишних скобок
 *
 * @param {*} val — исходное JS-значение для пропса
 * @returns {string} — корректный литерал для передачи в JSX
 */
function jsxValue(val) {
  if (val === undefined) return '{undefined}';
  if (val === null) return '{null}';
  if (typeof val === 'string') {
    if (val.startsWith('__JEST_FN__')) {
      // Пропустит, генерация идет через useVarsForMocks
      return undefined;
    }
    if (val.startsWith('__INLINE_FUNC__:')) {
      // Извлечь функцию из строки
      return `{${val.replace('__INLINE_FUNC__:', '').trim()}}`;
    }
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
    return `{${objectToJSX(val)}}`;
  }
  return `{${JSON.stringify(val)}}`;
}

/**
 * Сериализация значения для вложенных объектов/массивов:
 * - Не добавляет фигурные скобки вокруг объекта (нужно для вложенности в массиве/объекте)
 * @param {*} val — любое значение (объект, массив, строка, число и т.д.)
 * @returns {string} — строка для вставки во вложенную структуру объекта/массива
 */
function jsxValueForObject(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') {
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
 * @param {Object} obj — исходный объект (plain JS object)
 * @returns {string} — сериализованная строка полей вида: {key: value, ...}
 */
function objectToJSX(obj) {
  return `{${Object.entries(obj)
    .map(([k, v]) => `${k}: ${jsxValueForObject(v)}`)
    .join(', ')}}`;
}

/**
 * Получает props для текущего теста с учетом приоритета:
 * 1. props из теста (test.props)
 * 2. props из behavior-файла (behavior.props)
 * 3. props из глобальной карты (propsMap[componentName])
 * @param {object|null} test — объект теста из behavior.tests, либо null
 * @param {object|null} behavior — весь behavior-файл, либо null
 * @param {string} componentName — имя компонента
 * @returns {object} — итоговые props
 */
function getPropsForTest(test, behavior, componentName) {
  return (test && test.props) || (behavior && behavior.props) || propsMap[componentName] || {};
}

/**
 * Формирует строку пропсов для компонента, поддерживает генерацию переменных для jest.fn():
 * - useVarsForMocks: если true — значения __JEST_FN__ будут подставляться как handleOnClick={handleOnClick}
 * @param {string} componentName — имя компонента
 * @param {object|null} props — итоговые props для этого теста
 * @param {boolean} useVarsForMocks — если true, значения __JEST_FN__ подставляются как переменные
 * @returns {string} — строка с JSX-пропсами для вставки в компонент
 */
function generatePropsStr(componentName, props = null, useVarsForMocks = false) {
  const map = props || propsMap[componentName];
  if (!map) return '';
  return Object.entries(map)
    .map(([k, v]) => {
      // ----- спец. обработка для ref-пропсов -----
      if (k.toLowerCase().includes('ref')) {
        // Если это объект с current, то { current: null }
        if (typeof v === 'object' && v && 'current' in v) return ` ${k}={{ current: null }}`;
        return ` ${k}={null}`;
      }

      if (useVarsForMocks && v === '__JEST_FN__') return ` ${k}={${k}}`;

      const jsx = jsxValue(v);
      if (jsx === undefined) return '';
      return ` ${k}=${jsx}`;
    })
    .join('');
}

/**
 * Формирует блок объявлений jest.fn() для моков-функций из props.
 * Каждый prop со значением __JEST_FN__ объявляется: const имя = jest.fn();
 * @param {object} props
 * @returns {string}
 */
function generateJestMocksBlock(props) {
  let block = '';
  Object.entries(props || {}).forEach(([key, value]) => {
    if (value === '__JEST_FN__') {
      block += `  const ${key} = jest.fn();\n`;
    }
  });
  return block;
}

/**
 * Формирует строку дополнительных тестов на основе behavior.
 * Каждый тест получает вызов рендера с актуальными пропсами в начале тела.
 * Если у теста есть свои props — используются они, иначе общий behavior.props или дефолтные.
 * Моки объявляются локально в каждом тесте, если нужны.
 * @param {string} componentName
 * @param {object|null} behavior
 * @returns {string}
 */
function generateCustomTests(componentName, behavior) {
  if (!behavior?.tests || !Array.isArray(behavior.tests)) return '';
  return (
    '\n' +
    behavior.tests
      .map((test) => {
        // props и моки именно для этого теста
        const testProps = getPropsForTest(test, behavior, componentName);
        const jestMocksBlock = generateJestMocksBlock(testProps);
        const propsStr = generatePropsStr(componentName, testProps, true);
        const renderCall = `${RENDER_FUNCTION}(<${componentName} ${propsStr} />);`;
        const body = `${jestMocksBlock}${renderCall}\n${test.steps.trim()}`;
        return `  it('${test.it}', ${test.async ? 'async ' : ''}() => {\n${indentLines(
          body,
          4
        )}\n  });`;
      })
      .join('\n') +
    '\n'
  );
}

/**
 * Вспомогательная функция для красивых отступов кода в steps доп. тестов.
 * Каждый перенос строки получает дополнительный отступ.
 * @param {string} str — строка для форматирования
 * @param {number} spaces — количество пробелов для отступа
 * @returns {string}
 */
function indentLines(str, spaces = 2) {
  const pad = ' '.repeat(spaces);
  return str
    .split('\n')
    .map((line) => pad + line)
    .join('\n');
}

/**
 * Пытается загрузить behavior-конфиг для компонента, если он существует рядом с файлом.
 * Ищет файлы .behavior.cjs/.mjs/.js и возвращает default-экспорт как объект.
 * В случае ошибки загрузки выводит в консоль предупреждение.
 * @param {string} componentPath
 * @returns {Promise<object|null>}
 */
async function tryLoadBehavior(componentPath) {
  const dir = path.dirname(componentPath);
  const base = path.basename(componentPath, path.extname(componentPath));
  const behaviorFiles = [
    path.join(dir, `${base}.behavior.cjs`),
    path.join(dir, `${base}.behavior.mjs`),
    path.join(dir, `${base}.behavior.js`),
  ];
  for (const behaviorPath of behaviorFiles) {
    if (await fs.pathExists(behaviorPath)) {
      try {
        const behavior = await import(
          behaviorPath.startsWith('file://') ? behaviorPath : 'file://' + behaviorPath
        );
        if (typeof behavior.default !== 'object') {
          console.warn(`⚠️ Behavior-файл не экспортирует объект: ${behaviorPath}`);
          return null;
        }
        return behavior.default || behavior;
      } catch (err) {
        console.error(`Ошибка при загрузке behavior-файла ${behaviorPath}:`, err);
        return null;
      }
    }
  }
  return null;
}

/**
 * Собирает все нужные данные для генерации render-теста (и describe-блока).
 * Для render-теста props берутся из behavior.props > propsMap.
 * Для блоков jestMocks — тоже только глобальные моки.
 * @param {object|null} behavior — behavior-файл компонента (или null)
 * @param {string} componentName — имя компонента
 * @returns {{importLines: string, jestMocksBlock: string, renderPropsStr: string}}
 */
function getRenderTestContext(behavior, componentName) {
  const props = getPropsForTest(null, behavior, componentName);
  const jestMocksBlock = generateJestMocksBlock(props);
  const renderPropsStr = generatePropsStr(componentName, props, true);
  const importLines = behavior?.imports?.join('\n') || '';
  return { importLines, jestMocksBlock, renderPropsStr };
}

/**
 * Генерирует тестовый файл для компонента:
 * - Читает шаблон
 * - Формирует строку пропсов (с поддержкой моков типа __JEST_FN__)
 * - Подставляет значения в шаблон
 * - Проверяет существование файла (поведение зависит от ON_EXISTS: skip, ask, overwrite)
 * - Создаёт или перезаписывает файл
 * @param {string} componentPath — путь до исходного компонента
 * @param {string} template — строка шаблона теста
 * @param {string} testFilePath — путь до итогового файла теста
 * @param {string} componentName — имя компонента
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

  // ---- Грузим behavior (если есть) ----
  const behavior = await tryLoadBehavior(componentPath);

  // ---- Генерируем строки для render-теста (describe): импорты, блок моков, props ----
  const { importLines, jestMocksBlock, renderPropsStr } = getRenderTestContext(
    behavior,
    componentName
  );

  // ---- Генерируем блоки для кастомных тестов (props — индивидуальные для каждого теста!) ----
  const customTests = generateCustomTests(componentName, behavior);

  // ======= Формируем итоговый контент =======
  const content = template
    .replace(/\$\{EXTRA_IMPORTS\}/g, importLines ? importLines + '\n' : '')
    .replace(/\$\{COMPONENT_NAME\}/g, componentName)
    .replace(/\$\{JEST_MOCKS\}/g, jestMocksBlock)
    .replace(/\$\{COMPONENT_PROPS\}/g, renderPropsStr)
    .replace(/\$\{EXTRA_TESTS\}/g, customTests)
    .replace(/\$\{RENDER_FUNCTION\}/g, RENDER_FUNCTION);

  await fs.writeFile(testFilePath, content, 'utf-8');
  console.log(`✅ Сгенерирован: ${testFilePath}`);
}

/**
 * Главная логика генерации тестов по проекту:
 * - Читает шаблон теста
 * - Ищет все компоненты в ROOT_DIRS
 * - Для каждого компонента определяет тестовый файл и путь
 * - Генерирует тесты с учетом кастомных behavior (если есть)
 * - Поведение при существующем файле регулируется через ON_EXISTS
 */
(async () => {
  let template = '';
  try {
    template = await fs.readFile(TEMPLATE_PATH, 'utf-8');
  } catch (err) {
    console.error('Не найден файл шаблона теста:', TEMPLATE_PATH, err);
    process.exit(1);
  }
  for (const ROOT_DIR of ROOT_DIRS) {
    const patterns = COMPONENT_EXTS.map((ext) => `**/*.${ext}`);
    const excludePatterns = COMPONENT_EXTS.map((ext) => `**/*${EXCLUDE_NAME}.${ext}`);
    const files = await fg(patterns, { cwd: ROOT_DIR, absolute: true, ignore: excludePatterns });

    for (const file of files) {
      const dir = path.dirname(file);
      const base = path.basename(file, path.extname(file));
      const testFile = path.join(dir, `${base}.${TEST_SUFFIX}`);
      try {
        await generateTestFile(file, template, testFile, base);
      } catch (err) {
        console.error('Ошибка при генерации теста для:', file, err);
      }
    }
  }

  console.log('🎉 Готово!');
})();
