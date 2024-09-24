import { TypeNavArray, TypeNavLink, TypePartNavArray } from 'src/app/App';

// получаем текст markdown файла
export const apiGetFile = async (fileName: string) => {
  const data = { text: '', err: '' };
  try {
    const doc = await import(`../markdown${fileName}`);
    const res = await fetch(doc.default);
    data.text = await res.text();
  } catch (error) {
    data.err = (error as Error).message;
  }
  return data;
};

// получаем заголовок страницы из markdown файла (это первый заголовок h1 в md файле)
export const apiGetTitleFromPost = (pageText: string) => {
  const regex = /^# (.*)$/m;
  const matches = regex.exec(pageText);
  return matches ? matches[1] : '';
};

// получаем путь к изображению для конспекта
export const apiGetImgName = (mdPath: string) => `/conspectus/jpg/md${mdPath}-220.jpg`;

// получаем навигационную ссылку из меню сайта по указанном пути
export const apiGetNavItemByPath = (path: string, siteNav: TypeNavArray): TypeNavLink => {
  for (let i = 0; i < siteNav.length; i++) {
    if (siteNav[i].path === `/${path}`) return siteNav[i];
  }
  return siteNav[0];
};

// получаем массив навигационных ссылок из текста индексного файла в формате markdown
export const apiGetNavFromIndex = (index: string) => {
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const matches = index.matchAll(regex);
  let id = 1;
  const result = Array.from(matches, (match) => ({
    id: id++,
    name: match[1],
    path: match[2],
  }));
  return result;
};

// получаем массив навигационных ссылок из индексного файла
export const getPartNavFromFile = async (filePath: string) => {
  let partNav: TypeNavLink[] = [];
  const res = await apiGetFile(filePath);
  if (res.err === '') {
    partNav = apiGetNavFromIndex(res.text);
  }
  return partNav;
};

// получаем текстовый id для заголовка h2
// n - порядковый номер заголовка в конспекте
export const apiGetH2Id = (n: number): string => `h2-${n}`;

// получаем массив заголовков h2 из конспекта в формате HTML
// + к каждому заголовку h2 в конспекте добавляем id
export const apiGetHeadsArray = (el: HTMLElement | null): Array<string> => {
  if (el === null) return [];

  const h2Tags: HTMLCollection = el.getElementsByTagName('h2');
  const heads: Array<string> = [];
  for (let i = 0; i < h2Tags.length; i++) {
    const h2Tag = h2Tags[i];
    h2Tag.id = apiGetH2Id(i);
    heads.push(h2Tag.textContent || '');
  }
  return heads;
};

//======================   функции получения данных навигации

// главное меню сайта
export const apiGetSiteNav = async (
  rootLink: TypeNavLink,
  setSiteNav: React.Dispatch<React.SetStateAction<TypeNavArray>>
) => {
  const res = await apiGetFile('/index.md');
  if (res.err === '') {
    const navArr = apiGetNavFromIndex(res.text);
    setSiteNav([rootLink, ...navArr]);
  }
};

// меню раздела
export const apiGetPartNav = async (
  currentPartId: number,
  indexPath: string,
  partNavArray: TypePartNavArray,
  setPartNavArray: (newPartNavArray: TypePartNavArray) => void
) => {
  if (indexPath) {
    // получаем меню из индексного файла и помещаем его в массив меню разделов
    getPartNavFromFile(`${indexPath}/index.md`).then((partN) => {
      const newPartNavArray: TypePartNavArray = [...partNavArray];
      newPartNavArray[currentPartId] = partN;
      setPartNavArray(newPartNavArray);
    });
  }
};
