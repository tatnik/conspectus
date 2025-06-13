import React, { Suspense } from 'react';
import { Loader } from '@gravity-ui/uikit';

import { AppContextProvider } from './AppContext/AppContextProvider';
import { AppRouter } from './AppRouter/AppRouter';
import './styles/index.scss';

export const App = () => {
  return (
    <AppContextProvider>
      <Suspense fallback={<Loader size="l" />}>
        <AppRouter />
      </Suspense>
    </AppContextProvider>
  );
};
