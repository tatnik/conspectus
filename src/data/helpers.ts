import { BASENAME, IMG_MD_PATH } from 'src/constants';
import { TypeNavArray, TypeNavLink } from 'src/types/nav';

// получаем путь к изображению для конспекта
export const getImgName = (mdPath: string) => `${BASENAME}${IMG_MD_PATH}${mdPath}-220.jpg`;

// получаем навигационную ссылку из меню сайта по указанном пути
export const getNavItemByPath = (path: string, siteNav: TypeNavArray): TypeNavLink => {
  for (let i = 0; i < siteNav.length; i++) {
    if (siteNav[i].path === `/${path}`) return siteNav[i];
  }
  return siteNav[0];
};
