import './styles/index.scss';

import React, { Suspense, useState } from 'react';
import { Footer } from 'src/components/layout/Footer/Footer';
import { Header } from 'src/components/layout/Header/Header';
import navSite from 'src/markdown/navSite';

import { Loader } from '@gravity-ui/uikit';

import { AppRouter } from './AppRouter';

export const App = () => {
  const [titlePage, setTitlePage] = useState('');
  const [navPart, setNavPart] = useState([{ id: 0, name: '', path: '/' }]);

  return (
    <>
      <Suspense fallback={<Loader size="l" />}>
        <Header
          titlePage={titlePage}
          headerNav={navPart}
        />
        <div className="page-wrapper">
          <AppRouter
            navSite={navSite}
            setTitlePage={setTitlePage}
            setNavPart={setNavPart}
          />
        </div>
        <Footer nav={navSite} />
      </Suspense>
    </>
  );
};
