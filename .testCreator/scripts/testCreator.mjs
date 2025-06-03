import config from './testCreator.config.mjs';
import propsMap from './testCreator.propsMap.mjs';
import fs from 'fs-extra';
import path from 'path';
import fg from 'fast-glob';
import inquirer from 'inquirer';

// === Импорт карты пропсов ===

const {
  COMPONENT_EXTS,
  TEST_SUFFIX,
  TEMPLATE_PATH,
  ROOT_DIRS,
  EXCLUDE_NAME,
  ON_EXISTS,
  PROPS_MAP_PATH,
} = config;

// Сериализация значения для TSX-пропсов
function jsxValue(val) {
  if (val === undefined) return undefined;
  if (val === null) return '{null}';
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'number') return `{${val}}`;
  if (typeof val === 'boolean') return val ? '' : '{false}';
  if (Array.isArray(val)) return '{[]}';
  if (typeof val === 'object') return '{ {}}';
  return `{${val}}`;
}

// Формируем строку пропсов для компонента
function generatePropsStr(componentName) {
  const map = propsMap[componentName];
  if (!map) return '';
  return Object.entries(map)
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => {
      const jsx = jsxValue(v);
      if (jsx === undefined) return '';
      if (typeof v === 'boolean' && v === true) return ` ${k}`;
      return ` ${k}=${jsx}`;
    })
    .join('');
}

// Генерация теста для одного файла
async function generateTestFile(componentPath, template, testFilePath, componentName) {
  if (await fs.pathExists(testFilePath)) {
    if (ON_EXISTS === 'skip') {
      return;
    } else if (ON_EXISTS === 'overwrite') {
      // ничего не спрашиваем
    } else if (ON_EXISTS === 'ask') {
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
    } else {
      throw new Error(`Неизвестный параметр ON_EXISTS: ${ON_EXISTS}`);
    }
  }

  const propsStr = generatePropsStr(componentName);
  const content = template
    .replace(/\$\{COMPONENT_NAME\}/g, componentName)
    .replace(/\$\{COMPONENT_PROPS\}/g, propsStr);

  await fs.writeFile(testFilePath, content, 'utf-8');
  console.log(`✅ Сгенерирован: ${testFilePath}`);
}

// Основная логика
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
