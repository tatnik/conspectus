import './styles/index.scss';

import React, { Suspense } from 'react';
import { Loader } from '@gravity-ui/uikit';

import { AppContextProvider } from './AppContext/AppContextProvider';
import { AppRouter } from './AppRouter/AppRouter';

export const APP_TITLE = 'конспекты';
export const NOT_FOUND = 'Ошибка 404. Такая страница на сайте отсутствует!';

export type TypeNavLink = {
  id: number;
  name: string;
  path: string;
};

export type TypeNavArray = Array<TypeNavLink>;
export type TypePartNavArray = Array<TypeNavArray>;

export const App = () => {
  return (
    <>
      <AppContextProvider>
        <Suspense fallback={<Loader size="l" />}>
          <AppRouter />
        </Suspense>
      </AppContextProvider>
    </>
  );
};
