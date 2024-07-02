import React, { useCallback, useState } from 'react';
import { TypeNavLink } from 'src/components/layout/Nav/Nav';

export type TypeAppContext = {
  currentPart: TypeNavLink;
  setCurrentPart: (newPart: TypeNavLink) => void;
};

export const Context = React.createContext({} as TypeAppContext);

export const useCreateAppContext = (): TypeAppContext => {
  const [currentPart, setCurrentPart] = useState<TypeNavLink>({ id: 0, name: '', path: '' });

  const setNewPart = useCallback((newPart: TypeNavLink) => {
    setCurrentPart(newPart);
  }, []);
  return {
    currentPart,
    setCurrentPart: setNewPart,
  };
};
