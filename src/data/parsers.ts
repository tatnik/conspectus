import { TypeNavLink } from 'src/types/nav';
import { withError } from './decorators';

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

// Получение id для h2
export const parseIdFromH2 = (n: number): string => `h2-${n}`;

// Получение массива заголовков h2 из HTML-элемента
const parseHeadsArrayBase = (el: HTMLElement | null): Array<string> => {
  if (!el) return [];
  const h2Tags = el.getElementsByTagName('h2');
  const heads: string[] = [];
  for (let i = 0; i < h2Tags.length; i++) {
    h2Tags[i].id = parseIdFromH2(i);
    heads.push(h2Tags[i].textContent || '');
  }
  return heads;
};

export const parseHeadsArray = withError(parseHeadsArrayBase);
