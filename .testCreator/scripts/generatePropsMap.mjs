import { Project } from 'ts-morph';
import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import config from '../testCreator.config.mjs';

const { ROOT_DIRS, PROPS_MAP_PATH } = config;

/**
 * Генерирует mock-значение для любого типа:
 * - для примитивов — простое значение
 * - для функций — функция-заглушка
 * - для массивов — пустой массив
 * - для объектов — рекурсивно генерирует поля
 * - для any/unknown — undefined
 */
function getMockForType(type, visitedTypes = new Set()) {
  const typeKey = type.getText();
  if (visitedTypes.has(typeKey)) return '{}'; // Защита от рекурсии по типам
  visitedTypes.add(typeKey);

  if (type.isString?.()) return "''";
  if (type.isNumber?.()) return '0';
  if (type.isBoolean?.()) return 'false';
  if (type.isArray?.()) return '[]';
  if (type.isAny?.() || type.isUnknown?.()) return 'undefined';
  if (type.getCallSignatures?.()?.length) return '() => {}';
  if (type.isObject?.()) return objectMock(type, visitedTypes);

  return 'undefined';
}

/**
 * Генерирует mock-объект для сложного типа (object),
 * рекурсивно проходится по всем полям объекта.
 */
function objectMock(type, visitedTypes) {
  const props = type.getProperties?.();
  if (!props?.length) return '{}';
  const fields = props.map((field) => {
    const fieldType = getFieldType(field);
    const mock = fieldType ? getMockForType(fieldType, new Set(visitedTypes)) : 'undefined';
    return `${field.getName()}: ${mock}`;
  });
  return `{ ${fields.join(', ')} }`;
}

/**
 * Определяет тип поля через декларацию, если возможно.
 * Используется для получения максимально точного типа поля.
 */
function getFieldType(field) {
  const decls = field.getDeclarations?.() || [];
  if (decls.length) return field.getTypeAtLocation(decls[0]);
  return field.getType();
}

/**
 * Форматирует объект пропсов для вывода в итоговый propsMap файл.
 * Выводит результат в виде JS-объекта.
 */
function prettifyProps(obj) {
  return (
    '{ ' +
    Object.entries(obj)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ') +
    ' }'
  );
}

/**
 * Проверяет, является ли тип React-компонентом.
 * Сигнатура должна возвращать JSX/Element/ReactNode.
 */
function isReactComponentType(type) {
  const sigs = type.getCallSignatures?.() || [];
  if (!sigs.length) return false;
  const retType = sigs[0].getReturnType().getText();
  return (
    retType.includes('Element') || retType.includes('ReactNode') || retType.includes('JSX.Element')
  );
}

/**
 * Получает тип пропсов для стрелочного компонента (export const ...).
 * Ищет первый параметр и его тип.
 */
function getPropsTypeFromVariable(decl) {
  const init = decl.getInitializer?.();
  if (!init?.getParameters) return undefined;
  const params = init.getParameters();
  if (!params.length) return undefined;
  return params[0].getType();
}

/**
 * Получает тип пропсов для function-компонента (function ...).
 * Ищет первый параметр и его тип.
 */
function getPropsTypeFromFunction(fn) {
  const params = fn.getParameters?.();
  if (params?.length) return params[0].getType();
  return undefined;
}

/**
 * Получает тип пропсов для компонента, экспортируемого через export default.
 * Если тип — дженерик с аргументами, берёт первый аргумент.
 */
function getPropsTypeFromDefaultExport(decl) {
  const type = decl.getType?.();
  if (!type) return undefined;
  if (type.getTypeArguments?.().length) return type.getTypeArguments()[0];
  return undefined;
}

/**
 * Проверяет, является ли тип примитивным (string/number/boolean).
 * Такие типы не нужны для карты пропсов.
 */
function isPrimitivePropsType(propsType) {
  if (!propsType) return false;
  return propsType.isString?.() || propsType.isNumber?.() || propsType.isBoolean?.();
}

/**
 * Добавляет значения пропсов в propsMap, если найдены валидные поля.
 * Для каждого поля вычисляет mock-значение.
 */
function addPropsToMap(propsMap, compName, propsType, getFieldType) {
  if (!propsType?.getProperties) {
    console.log(`[SKIP] Нет getProperties для типа пропсов: ${compName}`);
    return;
  }
  if (!propsType.getProperties().length) {
    console.log(`[SKIP] Нет свойств у пропсов компонента: ${compName}`);
    return;
  }
  const fields = propsType.getProperties();
  const defaults = {};
  for (const field of fields) {
    const fieldType = getFieldType(field);
    defaults[field.getName()] = getMockForType(fieldType);
  }
  if (Object.keys(defaults).length) {
    propsMap[compName] = defaults;
    console.log(`[OK] Добавлен компонент: ${compName}`);
  } else {
    console.log(`[SKIP] Нет ни одного поля-пропса у компонента: ${compName}`);
  }
}

/**
 * Унифицированная обработка экспорта компонента любого типа.
 * Проверяет наличие пропсов, добавляет их в propsMap.
 */
function handleExport(propsMap, name, propsType, getFieldType, compNameForLog) {
  if (!propsType?.getProperties || !propsType.getProperties().length) {
    console.log(`[SKIP] Нет свойств у пропсов компонента: ${compNameForLog || name}`);
    return;
  }
  addPropsToMap(propsMap, name, propsType, getFieldType);
}

/**
 * Обрабатывает стрелочные компоненты (export const ...).
 * Для каждого export const анализирует тип пропсов и добавляет в propsMap.
 */
function processVariableExports(sourceFile, propsMap) {
  const variableDeclarations = sourceFile.getVariableDeclarations();
  for (const decl of variableDeclarations) {
    if (!decl.isExported()) continue;
    if (!isReactComponentType(decl.getType())) continue;

    const name = decl.getName();
    const propsType = getPropsTypeFromVariable(decl);
    handleExport(propsMap, name, propsType, (f) => f.getTypeAtLocation(decl), name);
  }
}

/**
 * Обрабатывает function-компоненты (function ...).
 * Для каждой экспортируемой функции анализирует тип пропсов и добавляет в propsMap.
 */
function processFunctionExports(sourceFile, propsMap) {
  const functions = sourceFile.getFunctions();
  for (const fn of functions) {
    if (!fn.isExported()) continue;
    const name = fn.getName();
    const propsType = getPropsTypeFromFunction(fn);
    handleExport(propsMap, name, propsType, (f) => f.getTypeAtLocation(fn), name);
  }
}

/**
 * Обрабатывает компоненты, экспортируемые через export default.
 * Использует имя файла как ключ для propsMap.
 */
function processDefaultExport(sourceFile, file, propsMap) {
  const defaultExportSymbol = sourceFile.getDefaultExportSymbol();
  if (defaultExportSymbol) {
    const decl = defaultExportSymbol.getValueDeclaration();
    if (!decl) {
      console.log(`[SKIP] Нет valueDeclaration для defaultExport в файле: ${file}`);
      return;
    }
    const propsType = getPropsTypeFromDefaultExport(decl);
    const compName = path.basename(file, '.tsx');
    handleExport(propsMap, compName, propsType, (f) => f.getTypeAtLocation(decl), compName);
  }
}

/**
 * Главная асинхронная функция генерации карты пропсов для всех компонентов проекта.
 * Собирает данные по всем .tsx файлам из ROOT_DIRS, вызывает генерацию mock-пропсов и пишет итоговый файл.
 */
async function main() {
  const project = new Project({ tsConfigFilePath: './tsconfig.json' });
  const propsMap = {};

  for (const dir of ROOT_DIRS) {
    const files = await fg('**/*.tsx', { cwd: dir, absolute: true });
    console.log(`[${dir}] найдено файлов: ${files.length}`);

    for (const file of files) {
      console.log(`---\nОбрабатываю файл: ${file}`);
      const sourceFile = project.addSourceFileAtPath(file);
      processVariableExports(sourceFile, propsMap);
      processFunctionExports(sourceFile, propsMap);
      processDefaultExport(sourceFile, file, propsMap);
    }
  }

  // --- Генерация итогового файла propsMap для автотестов --- //
  let output = '// Автоматически сгенерировано\nexport default {\n';
  for (const [comp, fields] of Object.entries(propsMap)) {
    output += `  ${comp}: ${prettifyProps(fields)},\n`;
  }
  output += '};\n';

  await fs.ensureDir(path.dirname(PROPS_MAP_PATH));
  await fs.writeFile(PROPS_MAP_PATH, output, 'utf-8');
  console.log(`✅ Сгенерирован ${PROPS_MAP_PATH}`);
}

main();
