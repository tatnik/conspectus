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
