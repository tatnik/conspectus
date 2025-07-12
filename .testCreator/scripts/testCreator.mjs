import config from '../testCreator.config.mjs';
import propsMap from '../testCreator.propsMap.mjs';
import fs from 'fs-extra';
import path from 'path';
import fg from 'fast-glob';
import inquirer from 'inquirer';

const { COMPONENT_EXTS, TEST_SUFFIX, TEMPLATE_PATH, ROOT_DIRS, EXCLUDE_NAME, ON_EXISTS } = config;

// ===== Сериализация значения для TSX-пропса =====
function jsxValue(val) {
  if (val === undefined) return '{undefined}';
  if (val === null) return '{null}';
  if (typeof val === 'string') return `"${val.replace(/"/g, '\\"')}"`;
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

// Эта функция используется только для вложенных объектов, не оборачивает результат в {}
function jsxValueForObject(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') return `"${val.replace(/"/g, '\\"')}"`;
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

// Преобразует объект в строку вида: id: 0, name: "", path: ""
function objectToJSX(obj) {
  return `{${Object.entries(obj)
    .map(([k, v]) => `${k}: ${jsxValueForObject(v)}`)
    .join(', ')}}`;
}

// ===== Формируем строку пропсов для компонента =====
function generatePropsStr(componentName) {
  const map = propsMap[componentName];
  if (!map) return '';
  return Object.entries(map)
    .map(([k, v]) => {
      const jsx = jsxValue(v);
      if (jsx === undefined) return '';
      return ` ${k}=${jsx}`;
    })
    .join('');
}

// ===== Генерация теста для одного файла =====
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

  const propsStr = generatePropsStr(componentName);
  const content = template
    .replace(/\$\{COMPONENT_NAME\}/g, componentName)
    .replace(/\$\{COMPONENT_PROPS\}/g, propsStr);

  await fs.writeFile(testFilePath, content, 'utf-8');
  console.log(`✅ Сгенерирован: ${testFilePath}`);
}

// ===== Основная логика =====
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
