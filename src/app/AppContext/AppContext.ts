import React, { useCallback, useLayoutEffect, useState } from 'react';

import { apiGetSiteNav } from 'src/data/Api';
import { TypeNavLink, TypeNavArray, TypePartNavArray } from '../App';

export type TypeAppContext = {
  currentPart: TypeNavLink;
  setCurrentPart: (newPart: TypeNavLink) => void;
  showPartNav: boolean;
  setShowPartNav: (newValue: boolean) => void;
  siteNav: TypeNavArray;
  setSiteNav: (newSiteNav: TypeNavArray) => void;
  partNavArray: TypePartNavArray;
  setPartNavArray: (newPartNavArray: TypePartNavArray) => void;
};

export const Context = React.createContext({} as TypeAppContext);

export const useCreateAppContext = (): TypeAppContext => {
  const emptyLink = { id: 0, name: '', path: '/' };
  // текущий раздел
  const [currentPart, setCurrentPart] = useState<TypeNavLink>(emptyLink);
  const setNewPart = useCallback((newPart: TypeNavLink) => {
    setCurrentPart(newPart);
  }, []);

  // отображение навигации для текущего раздела
  const [showPartNav, setShowPartNav] = useState<boolean>(false);
  const setNewShowPartNav = useCallback((newValue: boolean) => {
    setShowPartNav(newValue);
  }, []);

  // меню сайта
  const [siteNav, setSiteNav] = useState<TypeNavArray>([emptyLink]);
  const setNewSiteNav = useCallback((newValue: TypeNavArray) => setSiteNav(newValue), []);

  // массив меню разделов
  const [partNavArray, setPartNavArray] = useState<TypePartNavArray>([]);
  const setNewPartNavArray = useCallback((newValue: TypePartNavArray) => {
    setPartNavArray(newValue);
  }, []);

  useLayoutEffect(() => {
    // получаем меню сайта
    apiGetSiteNav(emptyLink, setSiteNav);
  }, []);

  return {
    currentPart,
    setCurrentPart: setNewPart,
    showPartNav,
    setShowPartNav: setNewShowPartNav,
    siteNav,
    setSiteNav: setNewSiteNav,
    partNavArray,
    setPartNavArray: setNewPartNavArray,
  };
};
