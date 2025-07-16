import config from '../testCreator.config.mjs';
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
 * Глубоко объединяет два plain-объекта (source поверх target).
 * @param {object} target — базовый объект.
 * @param {object} source — перекрывающий объект.
 * @returns {object} — новый объект, объединённый по ключам.
 */
function deepMerge(target, source) {
  if (!source) return { ...target };
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/**
 * Преобразует JS-значение в корректный JSX-литерал для пропса.
 * Строки — в кавычки, числа/boolean — в фигурные скобки,
 * undefined/null — явно, функции — заглушка, массивы/объекты — сериализация.
 * @param {*} val — исходное значение для пропса.
 * @returns {string|undefined} — литерал для JSX или undefined (если спец. обработка).
 */
function jsxValue(val) {
  if (val === undefined) return '{undefined}';
  if (val === null) return '{null}';
  if (typeof val === 'string') {
    if (val.startsWith('__JEST_FN__')) return undefined;
    if (val.startsWith('__INLINE_FUNC__:'))
      return `{${val.replace('__INLINE_FUNC__:', '').trim()}}`;
    if (/^jest\.fn\(\)$/.test(val) || /^\(\)\s*=>\s*{.*}$/.test(val)) return `{${val}}`;
    return `"${val.replace(/"/g, '\\"')}"`;
  }
  if (typeof val === 'number' || typeof val === 'boolean') return `{${val}}`;
  if (typeof val === 'function') return '{() => {}}';
  if (Array.isArray(val)) return `{[${val.map(jsxValueForObject).join(', ')}]}`;
  if (typeof val === 'object') return `{${objectToJSX(val)}}`;
  return `{${JSON.stringify(val)}}`;
}

/**
 * Сериализация значения для вложенных объектов/массивов в JSX.
 * @param {*} val — любое вложенное значение (объект, массив, строка и т.д.).
 * @returns {string}
 */
function jsxValueForObject(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') {
    if (/^jest\.fn\(\)$/.test(val) || /^\(\)\s*=>\s*{.*}$/.test(val)) return `{${val}}`;
    return `"${val.replace(/"/g, '\\"')}"`;
  }
  if (typeof val === 'number' || typeof val === 'boolean') return `${val}`;
  if (typeof val === 'function') return '() => {}';
  if (Array.isArray(val)) return `[${val.map(jsxValueForObject).join(', ')}]`;
  if (typeof val === 'object') return objectToJSX(val);
  return JSON.stringify(val);
}

/**
 * Сериализует plain-объект в строку вида {k1: v1, k2: v2, ...}.
 * Используется для вложенных объектов/массивов в JSX.
 * @param {Object} obj — исходный объект.
 * @returns {string}
 */
function objectToJSX(obj) {
  return `{${Object.entries(obj)
    .map(([k, v]) => `${k}: ${jsxValueForObject(v)}`)
    .join(', ')}}`;
}

/**
 * Получает итоговые props для теста:
 * - merge test.props поверх behavior.props (если test.props есть)
 * - если нет обоих — возвращает пустой объект
 * @param {object|null} test — тест из behavior.tests, либо null.
 * @param {object|null} behavior — весь behavior-файл, либо null.
 * @returns {object} — итоговые props.
 */
function getPropsForTest(test, behavior) {
  const behaviorProps = (behavior && behavior.props) || {};
  const testProps = (test && test.props) || {};
  if (Object.keys(testProps).length) return deepMerge(behaviorProps, testProps);
  return behaviorProps;
}

/**
 * Формирует строку пропсов для компонента, с поддержкой моков типа __JEST_FN__.
 * Если useVarsForMocks = true, значения __JEST_FN__ подставляются как переменные.
 * @param {object} props — итоговые props для этого теста/рендера.
 * @param {boolean} useVarsForMocks — подставлять переменные для моков.
 * @returns {string} — строка пропсов для JSX.
 */
function generatePropsStr(props = {}, useVarsForMocks = false) {
  if (!props || Object.keys(props).length === 0) return '';
  return Object.entries(props)
    .map(([k, v]) => {
      // спец. обработка для ref-пропсов (всегда null)
      if (k.toLowerCase().includes('ref')) {
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
 * Генерирует блок объявлений jest.fn() для моков-функций из props.
 * Каждый prop со значением __JEST_FN__ объявляется: const имя = jest.fn();
 * @param {object} props — объект с prop'ами для теста/рендера.
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
 * Формирует строку дополнительных тестов на основе behavior.tests.
 * В каждом тесте:
 * - объявляются моки (если есть)
 * - генерируется renderWithProviders с актуальными props
 * - если steps есть — добавляются steps после render
 * - если steps нет — только render.
 * @param {object} behavior — весь behavior-файл.
 * @param {string} componentName — имя компонента.
 * @returns {string}
 */
function generateCustomTests(behavior, componentName) {
  if (!behavior?.tests || !Array.isArray(behavior.tests)) return '';
  return (
    '\n' +
    behavior.tests
      .filter(
        (test) =>
          // Если есть steps — всегда включаем
          (test.steps && test.steps.trim()) ||
          // Если явно заданы props (не пустой объект) — включаем
          (test.props && Object.keys(test.props).length)
      )
      .map((test) => {
        const testProps = getPropsForTest(test, behavior);
        const jestMocksBlock = generateJestMocksBlock(testProps);
        const propsStr = generatePropsStr(testProps, true);
        const renderCall = `${RENDER_FUNCTION}(<${componentName}${propsStr} />);`;
        let body = jestMocksBlock + renderCall;
        if (test.steps) {
          body += '\n' + test.steps.trim();
        }
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
 * Форматирует многострочные шаги (steps) с отступом для читаемости.
 * @param {string} str — строка для форматирования.
 * @param {number} spaces — кол-во пробелов.
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
 * Проверяет наличие behavior-файла рядом с компонентом и загружает его.
 * Возвращает объект behavior если файл найден, иначе null.
 * @param {string} componentPath — путь до компонента.
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
 * Собирает данные для render-теста (describe-блока):
 * - импорты, блок моков, props для render.
 * @param {object|null} behavior — behavior-файл компонента.
 * @returns {{importLines: string, jestMocksBlock: string, renderPropsStr: string}}
 */
function getRenderTestContext(behavior) {
  const props = (behavior && behavior.props) || {};
  const jestMocksBlock = generateJestMocksBlock(props);
  const renderPropsStr = generatePropsStr(props, true);
  const importLines = behavior?.imports?.join('\n') || '';
  return { importLines, jestMocksBlock, renderPropsStr };
}

/**
 * Генерирует тестовый файл для компонента:
 * - Читает шаблон, формирует блоки для render и custom-тестов.
 * - Проверяет существование файла (поведение зависит от ON_EXISTS)
 * - Создаёт или перезаписывает файл
 * @param {string} componentPath — путь до компонента.
 * @param {string} template — строка шаблона теста.
 * @param {string} testFilePath — путь до итогового файла теста.
 * @param {string} componentName — имя компонента.
 * @param {object} behavior — загруженный behavior-файл.
 */
async function generateTestFile(componentPath, template, testFilePath, componentName, behavior) {
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

  // ---- Генерируем строки для render-теста (describe): импорты, блок моков, props ----
  const { importLines, jestMocksBlock, renderPropsStr } = getRenderTestContext(behavior);

  // ---- Генерируем блоки для кастомных тестов ----
  const customTests = generateCustomTests(behavior, componentName);

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
 * - Для каждого компонента ищет behavior
 * - Генерирует тесты ТОЛЬКО для компонентов с behavior-файлом
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
        // --- Грузим behavior ---
        const behavior = await tryLoadBehavior(file);
        if (!behavior) {
          // Нет behavior — не генерируем тест
          continue;
        }
        await generateTestFile(file, template, testFile, base, behavior);
      } catch (err) {
        console.error('Ошибка при генерации теста для:', file, err);
      }
    }
  }

  console.log('🎉 Готово!');
})();
