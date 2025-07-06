import { TypeNavLink } from 'src/types/nav';
import { withError } from './decorators';
import { HeadingInfo } from 'src/types/heading';

// Парсинг массива навигационных ссылок из markdown-текста
const parseNavFromIndexBase = (index: string): TypeNavLink[] => {
  const regex = /\[(.*?)\]\((.*?)\)/g;
  let id = 1;
  return Array.from(index.matchAll(regex), (match) => ({
    id: id++,
    name: match[1],
    path: match[2],
  }));
};

export const parseNavFromIndex = withError(parseNavFromIndexBase);

// Получение первого h1 как заголовка страницы
const parseTitleFromMarkdownBase = (pageText: string): string => {
  const regex = /^# (.*)$/m;
  const matches = regex.exec(pageText);
  return matches ? matches[1] : '';
};

export const parseTitleFromMarkdown = withError(parseTitleFromMarkdownBase);

// Получение слага по тексту
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-') // пробелы/небуквы -> дефис
    .replace(/(^-+)|(-+$)/g, '');
}

// Получение массива заголовков h2 из HTML-элемента
export const parseHeadingsFromHtmlBase = (el: HTMLElement | null): HeadingInfo[] => {
  if (!el) return [];
  const result: HeadingInfo[] = [];
  const usedSlugs: Record<string, number> = {};

  // h1..h6
  el.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const level = parseInt(heading.tagName[1]); // 'h2' -> 2
    const text = heading.textContent?.trim() ?? '';
    let slug = slugify(text);
    // если slug повторяется, добавлять -2, -3 и т.д.
    if (usedSlugs[slug]) {
      usedSlugs[slug] += 1;
      slug = `${slug}-${usedSlugs[slug]}`;
    } else {
      usedSlugs[slug] = 1;
    }
    const id = `h${level}-${slug}`;
    heading.id = id; // <- вешаем id для якоря!
    result.push({ id, text, level });
  });

  return result;
};

export const parseHeadingsFromHtml = withError(parseHeadingsFromHtmlBase);
