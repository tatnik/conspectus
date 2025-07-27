import { parseNavFromIndex } from '../utils/parsers';
import { TypeNavArray } from 'src/types/nav';
import { EMPTY_LINK } from 'src/constants';

import { withAsyncError } from '../utils/decorators';

/**
 * Асинхронно загружает текст файла markdown по указанному пути.
 *
 * @param {string} fileName - Путь к markdown-файлу (например, '/js/index.md').
 * @returns {Promise<string>} Содержимое файла в виде строки.
 * @throws {Error} Если файл не найден или ошибка сети.
 */
const getFileBase = async (fileName: string): Promise<string> => {
  const module = await import(`../markdown${fileName}`);
  const response = await fetch(module.default);
  if (!response.ok) throw new Error('Network error');
  return await response.text();
};
export const getFile = withAsyncError(getFileBase);

/**
 * Загружает и парсит index.md для формирования массива навигации раздела.
 *
 * @param {string} indexPath - Путь к папке с index.md (например, '/js').
 * @returns {Promise<TypeNavArray>} Массив объектов навигации, полученный из index.md.
 */
const getNavFromFileBase = async (indexPath: string): Promise<TypeNavArray> => {
  const text = await getFile(`${indexPath}/index.md`);
  return parseNavFromIndex(text);
};
export const getNavFromFile = withAsyncError(getNavFromFileBase);

/**
 * Загружает корневой index.md и формирует навигацию сайта.
 * Первый элемент массива — пустая ссылка EMPTY_LINK.
 *
 * @returns {Promise<TypeNavArray>} Массив объектов навигации всего сайта.
 */
const getSiteNavBase = async (): Promise<TypeNavArray> => {
  const nav = await getNavFromFile('');
  return [EMPTY_LINK, ...nav];
};
export const getSiteNav = withAsyncError(getSiteNavBase);
