import React, { useMemo, useState } from 'react';
import { EMPTY_LINK } from 'src/constans';

import { TypeNavLink, TypeNavArray, TypePartNavArray } from 'src/types/nav';
import { useSiteNav } from 'src/hooks/useSiteNav';

export type TypeAppContext = {
  currentPart: TypeNavLink;
  setCurrentPart: (newPart: TypeNavLink) => void;
  showPartNav: boolean;
  setShowPartNav: (newValue: boolean) => void;
  siteNav: TypeNavArray;
  partNavArray: TypePartNavArray;
  setPartNavArray: (newPartNavArray: TypePartNavArray) => void;
};

export const Context = React.createContext<TypeAppContext | undefined>(undefined);

export const useCreateAppContext = (): TypeAppContext => {
  const [currentPart, setCurrentPart] = useState<TypeNavLink>(EMPTY_LINK);

  // отображение навигации для текущего раздела
  const [showPartNav, setShowPartNav] = useState<boolean>(false);

  // меню сайта
  const siteNav = useSiteNav();

  // массив меню разделов
  const [partNavArray, setPartNavArray] = useState<TypePartNavArray>([]);

  return useMemo(
    () => ({
      currentPart,
      setCurrentPart,
      showPartNav,
      setShowPartNav,
      siteNav,
      partNavArray,
      setPartNavArray,
    }),
    [currentPart, showPartNav, siteNav, partNavArray]
  );
};
