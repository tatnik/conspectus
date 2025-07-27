import { BASENAME, EMPTY_LINK, IMG_MD_PATH } from 'src/constants';
import { TypeNavArray, TypeNavLink } from 'src/types/nav';

/**
 * Возвращает путь к изображению раздела по пути к md-файлу.
 * @param {string} mdPath - Относительный путь к md-файлу (например, '/js/js_arrays')
 * @returns {string} Путь к изображению для раздела.
 */
export const getImgName = (mdPath: string) => `${BASENAME}${IMG_MD_PATH}${mdPath}-220.jpg`;

/**
 * Ищет навигационный элемент по указанному пути.
 * @param {string} path - Путь (например, '/js/js_arrays')
 * @param {TypeNavArray} navArray - Массив навигационных ссылок
 * @returns {TypeNavLink} Найденный элемент или EMPTY_LINK, если не найдено.
 */
export const getNavItemByPath = (path: string, navArray: TypeNavArray): TypeNavLink => {
  const seekPath = path === '' || !path.startsWith('/') ? '/' + path : path;

  for (const element of navArray) {
    if (element.path === seekPath) return element;
  }
  return EMPTY_LINK;
};

/**
 * Ищет навигационный элемент по его id.
 * @param {number} id - ID элемента
 * @param {TypeNavArray} navArray - Массив навигационных ссылок
 * @returns {TypeNavLink|undefined} Найденный элемент или undefined, если не найдено.
 */
export const getNavItemById = (id: number, navArray: TypeNavArray): TypeNavLink | undefined => {
  for (const element of navArray) {
    if (element.id === id) return element;
  }
  return undefined;
};

/**
 * Генерирует слаг (slug) из строки: приводит к нижнему регистру, заменяет небуквенные символы на дефисы.
 * @param {string} text - Исходный текст
 * @returns {string} Слаг
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-') // пробелы/небуквы -> дефис
    .replace(/(^-+)|(-+$)/g, '');
};

/**
 * Формирует объект с id, текстом и уровнем для заголовка markdown.
 * Учитывает уникальность slug для файла.
 * @param {number} level - Уровень заголовка (1-6)
 * @param {string} text - Текст заголовка
 * @param {Record<string, number>} usedSlugs - Объект для подсчёта использованных слагов
 * @returns {{ id: string, text: string, level: number }} Объект информации о заголовке
 */
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

// получаем имя индексного файла для раздела (если id=0, это главаная страница сайта)
export const getIndexFileName = (part: TypeNavLink): string =>
  part.id === 0 ? '/index.md' : `${part.path}/index.md`;
