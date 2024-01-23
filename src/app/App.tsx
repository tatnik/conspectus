import './styles/index.scss';

import React, { Suspense, useLayoutEffect, useState } from 'react';
import { Loader } from '@gravity-ui/uikit';

import { getNavFromIndex } from 'src/utils/getNavFromIndex';

import { getFile } from './../utils/useGetPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import { MainPage } from 'src/pages/MainPage/MainPage';
import { IndexPage } from 'src/pages/IndexPage/IndexPage';
import { ContentPage } from 'src/pages/ContentPage/ContentPage';

export const App = () => {
  const [titlePage, setTitlePage] = useState('');
  const [navPart, setNavPart] = useState([{ id: 0, name: '', path: '/' }]);
  const [navSite, setNavSite] = useState([{ id: 0, name: '', path: '/' }]);

  const getNavSite = async () => {
    const res = await getFile('/index.md');
    setNavSite(getNavFromIndex(res.text));
    if (res.err !== '') {
      console.log(res.err);
    }
  };

  useLayoutEffect(() => {
    getNavSite();
  }, []);

  return (
    <>
      <Suspense fallback={<Loader size="l" />}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PageWrapper
                  titlePage={titlePage}
                  navPart={navPart}
                  navSite={navSite}
                />
              }
            >
              <Route
                index
                element={<MainPage setTitlePage={setTitlePage} />}
              />

              {navSite.map((val) => (
                <Route
                  path={val.path}
                  key={'r' + val.id}
                >
                  <Route
                    index
                    element={
                      <IndexPage
                        navItem={val}
                        setTitlePage={setTitlePage}
                      />
                    }
                  />
                  <Route
                    path=":fileName"
                    key={'r' + val.id}
                    element={
                      <ContentPage
                        navItem={val}
                        setTitlePage={setTitlePage}
                        setNavPart={setNavPart}
                      />
                    }
                  />
                </Route>
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
