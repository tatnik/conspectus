import React from 'react';

import { Context, useCreateAppContext } from './AppContext';

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useCreateAppContext();
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error('Context not found!');
  return context;
};
