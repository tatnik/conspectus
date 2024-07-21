import React, { useCallback, useLayoutEffect, useState } from 'react';
import { TypeNavLink } from 'src/components/layout/Nav/Nav';
import { getFile, getNavFromIndex } from 'src/utils/utils';

export type TypeAppContext = {
  currentPart: TypeNavLink;
  setCurrentPart: (newPart: TypeNavLink) => void;
  pageTitle: string;
  setPageTitle: (newPageTitle: string) => void;
  siteNav: TypeNavLink[];
};

export const Context = React.createContext({} as TypeAppContext);

export const useCreateAppContext = (): TypeAppContext => {
  const [currentPart, setCurrentPart] = useState<TypeNavLink>({ id: 0, name: '', path: '' });

  const setNewPart = useCallback((newPart: TypeNavLink) => {
    setCurrentPart(newPart);
  }, []);

  const [pageTitle, setPageTitle] = useState<string>('');
  const setNewPageTitle = useCallback((newPageTitle: string) => {
    setPageTitle(newPageTitle);
  }, []);

  const [siteNav, setSiteNav] = useState([{ id: 0, name: '', path: '/' }]);

  const getSiteNav = async () => {
    const res = await getFile('/index.md');
    setSiteNav(
      res.err === '' ? [{ id: 0, name: '', path: '/' }, ...getNavFromIndex(res.text)] : []
    );
  };

  useLayoutEffect(() => {
    getSiteNav();
  }, []);

  return {
    currentPart,
    setCurrentPart: setNewPart,
    pageTitle,
    setPageTitle: setNewPageTitle,
    siteNav,
  };
};
