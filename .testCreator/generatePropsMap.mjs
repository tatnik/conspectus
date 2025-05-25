import { Project } from 'ts-morph';
import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import config from './testCreator.config.mjs';

const { ROOT_DIRS, PROPS_MAP_PATH } = config;

function getDefaultForType(type) {
  if (type.isArray && type.isArray()) return '[]';
  if (type.isBoolean && type.isBoolean()) return 'false';
  if (type.isString && type.isString()) return "''";
  if (type.isNumber && type.isNumber()) return '0';
  // ВНИМАНИЕ: если это функция (call signature), возвращай "() => {}"
  if (type.getCallSignatures && type.getCallSignatures().length > 0) return '() => {}';
  // Если это object, проверь, не функция ли это (call signature выше)
  if (type.isObject && type.isObject()) return '{}';
  if ((type.isAny && type.isAny()) || (type.isUnknown && type.isUnknown())) return 'undefined';
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

      // Найти все переменные-экспорты
      sourceFile.getVariableDeclarations().forEach((decl) => {
        if (decl.isExported()) {
          const name = decl.getName();
          // Тип компонента: React.FC<Props>
          const type = decl.getType();
          let propsType;
          if (type.getTypeArguments && type.getTypeArguments().length > 0) {
            propsType = type.getTypeArguments()[0];
          } else if (
            decl.getInitializer() &&
            decl.getInitializer().getParameters &&
            decl.getInitializer().getParameters().length > 0
          ) {
            // Возможно, arrow function c пропсами
            const param = decl.getInitializer().getParameters()[0];
            if (param && param.getType) {
              propsType = param.getType();
            }
          }
          if (propsType && propsType.getProperties) {
            const fields = propsType.getProperties();
            let defaults = {};
            for (const field of fields) {
              const fieldType = field.getTypeAtLocation(decl);
              defaults[field.getName()] = getDefaultForType(fieldType);
            }
            if (Object.keys(defaults).length > 0) {
              propsMap[name] = defaults;
            }
          }
        }
      });

      // Также обработаем function declaration
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
                defaults[field.getName()] = getDefaultForType(fieldType);
              }
              if (Object.keys(defaults).length > 0) {
                propsMap[name] = defaults;
              }
            }
          }
        }
      });

      // Также поддержим export default (по имени файла)
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
              defaults[field.getName()] = getDefaultForType(fieldType);
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
