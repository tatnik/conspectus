import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { EMPTY_LINK } from 'src/constants';

import { TypeNavLink, TypeNavArray, TypePartNavArray } from 'src/types/nav';

import { getNavFromFile, getSiteNav } from 'src/data/api';

export type TypeAppContext = {
  currentPart: TypeNavLink;
  setCurrentPart: (newPart: TypeNavLink) => void;
  showPartNav: boolean;
  setShowPartNav: (newValue: boolean) => void;
  siteNav: TypeNavArray;
  partNavArray: TypePartNavArray;
  setPartNavArray: (newPartNavArray: TypePartNavArray) => void;
  loadPartNav: (partId: number, indexPath: string) => void;
  dataError: string;
  setDataError: (newValue: string) => void;
};

export const Context = React.createContext<TypeAppContext | undefined>(undefined);

export const useCreateAppContext = (): TypeAppContext => {
  const [currentPart, setCurrentPart] = useState<TypeNavLink>(EMPTY_LINK);

  // отображение навигации для текущего раздела
  const [showPartNav, setShowPartNav] = useState<boolean>(false);

  // меню сайта
  const [siteNav, setSiteNav] = useState<TypeNavArray>([EMPTY_LINK]);

  // массив меню разделов
  const [partNavArray, setPartNavArray] = useState<TypePartNavArray>([]);

  // ошибки загрузки данных
  const [dataError, setDataError] = useState<string>('');

  // --- Получаем главное меню при запуске приложения
  useLayoutEffect(() => {
    const fetchNav = async () => {
      try {
        const nav = await getSiteNav();
        setSiteNav(nav);
        setDataError('');
      } catch (error) {
        setSiteNav([EMPTY_LINK]);
        setDataError((error as Error).message);
      }
    };
    fetchNav();
  }, []);

  // --- Загружаем меню раздела по необходимости
  const loadPartNav = useCallback(async (partId: number, indexPath: string) => {
    try {
      const nav = await getNavFromFile(indexPath);
      setPartNavArray((prev) => {
        const newArr = [...prev];
        newArr[partId] = nav;
        setDataError('');
        return newArr;
      });
    } catch (error) {
      setDataError((error as Error).message);
    }
  }, []);

  return useMemo(
    () => ({
      currentPart,
      setCurrentPart,
      showPartNav,
      setShowPartNav,
      siteNav,
      partNavArray,
      setPartNavArray,
      loadPartNav,
      dataError,
      setDataError,
    }),
    [currentPart, showPartNav, siteNav, partNavArray]
  );
};
