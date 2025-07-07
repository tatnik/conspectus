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
}

// Рекурсивно собираем все md-файлы, кроме index.md
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

// Выделяем заголовки, их уровень и строку (id делаем с помощью getHeadingInfo)
function extractHeadings(mdText: string) {
  const headingRegex = /^(#+)\s+(.*)$/gm;
  let match: RegExpExecArray | null;
  const headings: { level: number; text: string; line: number }[] = [];
  let level = 0;
  let line = 0;
  while ((match = headingRegex.exec(mdText)) !== null) {
    // заголовок первого уровня может находиться только в первой строке конспекта и он должен быть только один
    // внутри конспекта в блоках кода могут быть строки Python-комментариев, начинающиеся с #, они не должны попасть в итоговый массив
    level = match[1].length;
    line = mdText.slice(0, match.index).split('\n').length;
    if (level === 1 && line > 1) continue;
    headings.push({
      level,
      text: match[2],
      line,
    });
  }
  return headings;
}

// Функция для формирования ссылки
function getLink(filename: string, id: string): string {
  const fileNoExt = filename.replace(/\.md$/, '');
  return `${fileNoExt}#${id}`;
}

function main() {
  const mdFiles: string[] = walk(MARKDOWN_DIR);
  const result: SearchHeading[] = [];
  mdFiles.forEach((filePath) => {
    const relPath = path.relative(MARKDOWN_DIR, filePath);
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
      });
    });
  });
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`search-index.json создан. Заголовков: ${result.length}`);
}

//!  код следующих функций копируем из src/utils/helpers.ts

// получаем слаг из текста
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-') // пробелы/небуквы -> дефис
    .replace(/(^-+)|(-+$)/g, '');
}

// генерируем id по тексту заголовка
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
