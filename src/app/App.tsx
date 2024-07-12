import './styles/index.scss';

import React, { Suspense, useLayoutEffect, useState } from 'react';
import { Loader } from '@gravity-ui/uikit';

import { getFile, getNavFromIndex } from 'src/utils/utils';
import { AppContextProvider } from './AppContext/AppContextProvider';
import { AppRouter } from './AppRouter/AppRouter';

export const APP_TITLE = 'конспекты';
export const NOT_FOUND = 'Ошибка 404. Такая страница на сайте отсутствует!';

export const App = () => {
  const [navSite, setNavSite] = useState([{ id: 0, name: '', path: '/' }]);

  const getNavSite = async () => {
    const res = await getFile('/index.md');
    setNavSite(res.err === '' ? getNavFromIndex(res.text) : []);
  };

  useLayoutEffect(() => {
    getNavSite();
  }, []);

  return (
    <>
      <AppContextProvider>
        <Suspense fallback={<Loader size="l" />}>
          <AppRouter navSite={navSite} />
        </Suspense>
      </AppContextProvider>
    </>
  );
};
