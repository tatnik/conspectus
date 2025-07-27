import { TypeNavLink } from 'src/types/nav';
import { withError } from 'src/utils/decorators';
import { HeadingInfo } from 'src/types/heading';
import { getHeadingInfo } from 'src/utils/helpers';

/**
 * Парсит массив навигационных ссылок из markdown-текста (обычно из index.md).
 * Ищет строки вида `[название](путь)` и возвращает массив ссылок.
 *
 * @param {string} index - Markdown-текст, содержащий навигационные ссылки.
 * @returns {TypeNavLink[]} Массив объектов с id, name, path.
 */
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

/**
 * Возвращает текст первого заголовка первого уровня (h1) из markdown-файла.
 *
 * @param {string} pageText - Markdown-текст страницы.
 * @returns {string} Текст первого заголовка h1 или пустая строка.
 */
const parseTitleFromMarkdownBase = (pageText: string): string => {
  const regex = /^# (.*)$/m;
  const matches = regex.exec(pageText);
  return matches ? matches[1] : '';
};

export const parseTitleFromMarkdown = withError(parseTitleFromMarkdownBase);

/**
 * Извлекает массив объектов-заголовков (h1...h6) из HTML-элемента, добавляет id для якорей.
 *
 * @param {HTMLElement | null} el - DOM-элемент с html содержимым (например, div с рендером markdown).
 * @returns {HeadingInfo[]} Массив информации о заголовках (id, level, text).
 */
export const parseHeadingsFromHtmlBase = (el: HTMLElement | null): HeadingInfo[] => {
  if (!el) return [];
  const result: HeadingInfo[] = [];
  const usedSlugs: Record<string, number> = {};
  // h1..h6
  el.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const level = parseInt(heading.tagName[1], 10); // 'h2' -> 2
    const text = heading.textContent?.trim() ?? '';
    const headingInfo = getHeadingInfo(level, text, usedSlugs);
    heading.id = headingInfo.id; // <- вешаем id для якоря!
    result.push(headingInfo);
  });

  return result;
};

export const parseHeadingsFromHtml = withError(parseHeadingsFromHtmlBase);
