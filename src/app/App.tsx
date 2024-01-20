import './styles/index.scss';

import React, { Suspense, useLayoutEffect, useState } from 'react';
import { Footer } from 'src/components/layout/Footer/Footer';
import { Header } from 'src/components/layout/Header/Header';
//import { navSite as nav } from 'src/markdown/navSite';

import { Loader } from '@gravity-ui/uikit';

import { AppRouter } from './AppRouter';
import { useGetPost } from 'src/utils/useGetPost';
import { getNavFromIndex } from 'src/utils/getNavFromIndex';

//import { TypeNavLink } from 'src/markdown/navSite';

export const App = () => {
  const [titlePage, setTitlePage] = useState('');
  const [navPart, setNavPart] = useState([{ id: 0, name: '', path: '/' }]);

  const [post, setPost] = useState('');
  //const [navSite, setNavSite] = useState(nav);

  const [navSite, setNavSite] = useState([
    {
      id: 0,
      name: 'Главная',
      path: '/',
    },
  ]);

  // eslint-disable-next-line prettier/prettier
  const fileName = '/index.md';

  useGetPost({ fileName, setPost });

  useLayoutEffect(() => {
    const addNav = getNavFromIndex(post);
    setNavSite(addNav);
  }, [post]);

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
