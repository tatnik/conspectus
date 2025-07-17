import React from 'react';

import { Context, TypeAppContext, useCreateAppContext } from './AppContext';

export const AppContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: TypeAppContext;
}) => {
  const context = useCreateAppContext();
  return <Context.Provider value={value ?? context}>{children}</Context.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error('Context not found!');
  return context;
};
