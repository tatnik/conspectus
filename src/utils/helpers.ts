import { BASENAME, EMPTY_LINK, IMG_MD_PATH } from 'src/constants';
import { TypeNavArray, TypeNavLink } from 'src/types/nav';

// получаем путь к изображению для конспекта
export const getImgName = (mdPath: string) => `${BASENAME}${IMG_MD_PATH}${mdPath}-220.jpg`;

// получаем навигационную ссылку из массива ссылок  по указанном пути
export const getNavItemByPath = (path: string, navArray: TypeNavArray): TypeNavLink => {
  const seekPath = path === '' || !path.startsWith('/') ? '/' + path : path;

  for (const element of navArray) {
    if (element.path === seekPath) return element;
  }
  return EMPTY_LINK;
};

// получаем навигационную ссылку из массива ссылок  по id
export const getNavItemById = (id: number, navArray: TypeNavArray): TypeNavLink => {
  for (const element of navArray) {
    if (element.id === id) return element;
  }
  return EMPTY_LINK;
};

// получаем слаг из текста
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-') // пробелы/небуквы -> дефис
    .replace(/(^-+)|(-+$)/g, '');
};

// генерируем id по тексту заголовка
export const getHeadingInfo = (level: number, text: string, usedSlugs: Record<string, number>) => {
  let slug = slugify(text);
  if (usedSlugs[slug]) {
    usedSlugs[slug] += 1;
    slug = `${slug}-${usedSlugs[slug]}`;
  } else {
    usedSlugs[slug] = 1;
  }
  const id = `h${level}-${slug}`;
  return { id, text, level };
};
