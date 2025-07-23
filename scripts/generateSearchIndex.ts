//! Скрипт для формирования файла с данными для поиска 'public/search-index.json',
//! не включается в билд, запускается перед деплоем
//
// ! slugify, getHeadingInfo должны быть идентичны одноименным функциям в src/utils/helpers.ts

const fs = require('fs');
const path = require('path');

const MARKDOWN_DIR = path.join(__dirname, '../src/markdown');
const OUTPUT = path.join(__dirname, '../public/search-index.json');

interface SearchHeading {
  id: string;
  text: string;
  level: number;
  link: string;
  breadcrumbs: string;
}

type HeadingWithBreadcrumbs = {
  level: number;
  text: string;
  line: number;
  breadcrumbs: string; // новый ключ
};

/**
 * Рекурсивно обходит директорию и возвращает массив всех .md файлов, кроме index.md.
 * @param {string} dir - Абсолютный путь к директории для обхода.
 * @returns {string[]} - Массив абсолютных путей к найденным .md-файлам (без index.md).
 */
function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (
      file.endsWith('.md') &&
      path.basename(file).toLowerCase() !== 'index.md' // <--- исключаем index.md
    ) {
      results.push(filePath);
    }
  });
  return results;
}

/**
 * Извлекает из markdown-текста все заголовки (h1, h2, h3, ...), определяя их уровень, текст, строку и хлебные крошки.
 * Breadcrumbs формируются по иерархии заголовков (например, "Часть / Глава").
 * @param {string} mdText - Текст markdown-файла.
 * @returns {HeadingWithBreadcrumbs[]} - Массив заголовков с уровнем, текстом, номером строки и breadcrumbs.
 */
function extractHeadings(mdText: string) {
  const headingRegex = /^(#+)\s+(.*)$/gm;
  let match: RegExpExecArray | null;
  const headings: HeadingWithBreadcrumbs[] = [];

  // Стек с последними заголовками каждого уровня
  const parents: { level: number; text: string }[] = [];

  while ((match = headingRegex.exec(mdText)) !== null) {
    // заголовок первого уровня может находиться только в первой строке конспекта и он должен быть только один
    // внутри конспекта в блоках кода могут быть строки Python-комментариев, начинающиеся с #, они не должны попасть в итоговый массив
    const level = match[1].length;
    const line = mdText.slice(0, match.index).split('\n').length;

    if (level === 1 && line > 1) continue;

    const text = match[2];

    // Обновляем parents-стек: удаляем все уровни >= текущего
    while (parents.length && parents[parents.length - 1].level >= level) {
      parents.pop();
    }
    parents.push({ level, text });

    // Формируем breadcrumbs
    const breadcrumbs = parents.map((h) => h.text).join(' / ');

    headings.push({
      level,
      text,
      line,
      breadcrumbs,
    });
  }
  return headings;
}

/**
 * Формирует ссылку на заголовок внутри markdown-файла (например, '/js/arrays#h2-map').
 * @param {string} filename - Путь к файлу (с расширением .md).
 * @param {string} id - id заголовка (например, 'h2-map').
 * @returns {string} - Ссылка на заголовок (без домена).
 */
function getLink(filename: string, id: string): string {
  const fileNoExt = filename.replace(/\.md$/, '');
  return `${fileNoExt}#${id}`;
}

/**
 * Главная функция скрипта: проходит по всем markdown-файлам, извлекает заголовки, формирует итоговый массив для поиска и сохраняет его в OUTPUT.
 * @returns {void}
 */
function main() {
  const mdFiles: string[] = walk(MARKDOWN_DIR);
  const result: SearchHeading[] = [];
  mdFiles.forEach((filePath) => {
    const relPath = '/' + path.relative(MARKDOWN_DIR, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf-8');
    const headings = extractHeadings(content);
    // Для уникальности slug по файлу
    const usedSlugs: Record<string, number> = {};

    headings.forEach((h) => {
      const { id } = getHeadingInfo(h.level, h.text, usedSlugs); // используем общую функцию!
      result.push({
        id,
        text: h.text,
        level: h.level,
        link: getLink(relPath, id),
        breadcrumbs: h.breadcrumbs,
      });
    });
  });
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`search-index.json создан. Заголовков: ${result.length}`);
}

//!  код следующих функций копируем из src/utils/helpers.ts

/**
 * Генерирует слаг (url-friendly идентификатор) из текста: переводит в нижний регистр, заменяет пробелы/символы на дефисы, убирает лишние дефисы.
 * @param {string} text - Исходный текст заголовка.
 * @returns {string} - Слаг для URL/id.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-') // пробелы/небуквы -> дефис
    .replace(/(^-+)|(-+$)/g, '');
}

/**
 * Генерирует уникальный id для заголовка с учётом его уровня и количества повторов слагов внутри одного файла.
 * Пример результата: { id: "h2-array-map", text: "Map", level: 2 }
 * @param {number} level - Уровень заголовка (1-6).
 * @param {string} text - Текст заголовка.
 * @param {Record<string, number>} usedSlugs - Счётчик слагов для текущего файла (для уникальности).
 * @returns {{ id: string, text: string, level: number }} - Объект с уникальным id, текстом и уровнем.
 */
function getHeadingInfo(level: number, text: string, usedSlugs: Record<string, number>) {
  let slug = slugify(text);
  if (usedSlugs[slug]) {
    usedSlugs[slug] += 1;
    slug = `${slug}-${usedSlugs[slug]}`;
  } else {
    usedSlugs[slug] = 1;
  }
  const id = `h${level}-${slug}`;
  return { id, text, level };
}

main();
