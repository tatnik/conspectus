import './styles/index.scss';

import React, { Suspense, useLayoutEffect, useState } from 'react';
import { Footer } from 'src/components/layout/Footer/Footer';
import { Header } from 'src/components/layout/Header/Header';
//import { navSite as nav } from 'src/markdown/navSite';

import { Loader } from '@gravity-ui/uikit';

import { AppRouter } from './AppRouter';
//import { useGetPost } from 'src/utils/useGetPost';
import { getNavFromIndex } from 'src/utils/getNavFromIndex';

//import { TypeNavLink } from 'src/markdown/navSite';
import { getFile } from './../utils/useGetPost';

export const App = () => {
  const [titlePage, setTitlePage] = useState('');
  const [navPart, setNavPart] = useState([{ id: 0, name: '', path: '/' }]);
  const [navSite, setNavSite] = useState([{ id: 0, name: '', path: '/' }]);

  const getNavSite = async () => {
    const res = await getFile('/index.md');
    if (res.err === '') {
      setNavSite(getNavFromIndex(res.text));
    } else {
      console.log(res.err);
    }
  };

  useLayoutEffect(() => {
    getNavSite();
  }, []);

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
