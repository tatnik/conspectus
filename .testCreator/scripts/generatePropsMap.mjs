import { Project } from 'ts-morph';
import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import config from '../testCreator.config.mjs';

const { ROOT_DIRS, PROPS_MAP_PATH } = config;

// Рекурсивная генерация mock для любого типа
function getMockForType(type, visitedTypes = new Set()) {
  // Не зацикливаться на рекурсивных типах
  const typeKey = type.getText();
  if (visitedTypes.has(typeKey)) return '{}';
  visitedTypes.add(typeKey);

  if (type.isString && type.isString()) return "''";
  if (type.isNumber && type.isNumber()) return '0';
  if (type.isBoolean && type.isBoolean()) return 'false';
  if (type.isArray && type.isArray()) return '[]';
  if ((type.isAny && type.isAny()) || (type.isUnknown && type.isUnknown())) return 'undefined';

  // Если функция — просто мок
  if (type.getCallSignatures && type.getCallSignatures().length > 0) return '() => {}';

  // Сложный объект — рекурсивно генерим его поля
  if (type.isObject && type.isObject()) {
    const props = type.getProperties();
    if (!props || props.length === 0) return '{}';
    let fields = [];
    for (const field of props) {
      let fieldType;
      // Для корректной работы ищем декларацию поля (чтобы не словить undefined)
      if (field.getTypeAtLocation) {
        const declarations = field.getDeclarations?.() || [];
        if (declarations.length > 0) {
          fieldType = field.getTypeAtLocation(declarations[0]);
        } else {
          // Иногда декларация отсутствует, fallback:
          fieldType = field.getType();
        }
      } else {
        fieldType = field.getType();
      }
      const mock = fieldType ? getMockForType(fieldType, new Set(visitedTypes)) : 'undefined';
      fields.push(`${field.getName()}: ${mock}`);
    }
    return `{ ${fields.join(', ')} }`;
  }

  return 'undefined';
}

function prettifyProps(obj) {
  let s = '{ ';
  for (let [k, v] of Object.entries(obj)) s += `${k}: ${v}, `;
  return s + '}';
}

async function main() {
  const project = new Project({ tsConfigFilePath: './tsconfig.json' });
  let propsMap = {};

  for (const dir of ROOT_DIRS) {
    const files = await fg('**/*.tsx', { cwd: dir, absolute: true });
    for (const file of files) {
      const sourceFile = project.addSourceFileAtPath(file);

      // Переменные-экспорты (стрелочные компоненты)
      for (const decl of sourceFile.getVariableDeclarations()) {
        if (decl.isExported()) {
          const name = decl.getName();
          const type = decl.getType();

          // Исключаем не-компоненты: если возвращаемый тип функции не Element/ReactNode/JSX.Element
          if (type.getCallSignatures && type.getCallSignatures().length > 0) {
            const signature = type.getCallSignatures()[0];
            if (signature) {
              const returnType = signature.getReturnType();
              const returnText = returnType.getText();
              if (
                !(
                  returnText.includes('Element') ||
                  returnText.includes('ReactNode') ||
                  returnText.includes('JSX.Element')
                )
              ) {
                continue; // Не компонент
              }
            }
          }

          let propsType;
          if (type.getTypeArguments && type.getTypeArguments().length > 0) {
            propsType = type.getTypeArguments()[0];
          } else if (
            decl.getInitializer() &&
            decl.getInitializer().getParameters &&
            decl.getInitializer().getParameters().length > 0
          ) {
            // Arrow function c пропсами
            const param = decl.getInitializer().getParameters()[0];
            if (param && param.getType) {
              propsType = param.getType();
            }
          }
          // Пропускаем если пропсы — чистый примитив
          if (
            !propsType ||
            propsType.isString?.() ||
            propsType.isNumber?.() ||
            propsType.isBoolean?.()
          ) {
            continue;
          }
          if (propsType && propsType.getProperties && propsType.getProperties().length > 0) {
            const fields = propsType.getProperties();
            let defaults = {};
            for (const field of fields) {
              const fieldType = field.getTypeAtLocation(decl);
              defaults[field.getName()] = getMockForType(fieldType);
            }
            if (Object.keys(defaults).length > 0) {
              propsMap[name] = defaults;
            }
          }
        }
      }

      // Function declaration (дефолтные функции)
      sourceFile.getFunctions().forEach((fn) => {
        if (fn.isExported()) {
          const name = fn.getName();
          const params = fn.getParameters();
          if (params.length > 0) {
            const param = params[0];
            const propsType = param.getType();
            if (propsType && propsType.getProperties) {
              const fields = propsType.getProperties();
              let defaults = {};
              for (const field of fields) {
                const fieldType = field.getTypeAtLocation(fn);
                defaults[field.getName()] = getMockForType(fieldType);
              }
              if (Object.keys(defaults).length > 0) {
                propsMap[name] = defaults;
              }
            }
          }
        }
      });

      // Export default (по имени файла)
      const defaultExportSymbol = sourceFile.getDefaultExportSymbol();
      if (defaultExportSymbol) {
        const decl = defaultExportSymbol.getValueDeclaration();
        if (decl && decl.getType) {
          const type = decl.getType();
          let propsType;
          if (type.getTypeArguments && type.getTypeArguments().length > 0) {
            propsType = type.getTypeArguments()[0];
          }
          if (propsType && propsType.getProperties) {
            const fields = propsType.getProperties();
            let defaults = {};
            for (const field of fields) {
              const fieldType = field.getTypeAtLocation(decl);
              defaults[field.getName()] = getMockForType(fieldType);
            }
            if (Object.keys(defaults).length > 0) {
              // Имя компонента по имени файла
              const compName = path.basename(file, '.tsx');
              propsMap[compName] = defaults;
            }
          }
        }
      }
    }
  }

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
