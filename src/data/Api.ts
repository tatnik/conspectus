import { parseNavFromIndex } from './parsers';
import { TypeNavArray } from 'src/types/nav';
import { EMPTY_LINK } from 'src/constants';

import { withAsyncError } from './decorators';

const getFileBase = async (fileName: string): Promise<string> => {
  const module = await import(`../markdown${fileName}`);
  const response = await fetch(module.default);
  if (!response.ok) throw new Error('Network error');
  return await response.text();
};
export const getFile = withAsyncError(getFileBase);

const getNavFromFileBase = async (indexPath: string): Promise<TypeNavArray> => {
  const text = await getFile(`${indexPath}/index.md`);
  return parseNavFromIndex(text);
};
export const getNavFromFile = withAsyncError(getNavFromFileBase);

const getSiteNavBase = async (): Promise<TypeNavArray> => {
  const nav = await getNavFromFile('');
  return [EMPTY_LINK, ...nav];
};
export const getSiteNav = withAsyncError(getSiteNavBase);
