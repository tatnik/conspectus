import { TypeNavLink } from 'src/types/nav';
import { withError } from 'src/utils/decorators';
import { HeadingInfo } from 'src/types/heading';
import { getHeadingInfo } from 'src/utils/helpers';

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

// Получение массива заголовков из HTML-элемента и установка id в заголовках
export const parseHeadingsFromHtmlBase = (el: HTMLElement | null): HeadingInfo[] => {
  if (!el) return [];
  const result: HeadingInfo[] = [];
  const usedSlugs: Record<string, number> = {};
  // h1..h6
  el.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const level = parseInt(heading.tagName[1]); // 'h2' -> 2
    const text = heading.textContent?.trim() ?? '';
    const headingInfo = getHeadingInfo(level, text, usedSlugs);
    heading.id = headingInfo.id; // <- вешаем id для якоря!
    result.push(headingInfo);
  });

  return result;
};

export const parseHeadingsFromHtml = withError(parseHeadingsFromHtmlBase);
