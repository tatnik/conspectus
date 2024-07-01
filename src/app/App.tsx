import './styles/index.scss';

import React, { Suspense, useLayoutEffect, useState } from 'react';
import { Loader } from '@gravity-ui/uikit';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import { MainPage } from 'src/pages/MainPage/MainPage';
import { IndexPage } from 'src/pages/IndexPage/IndexPage';
import { ContentPage } from 'src/pages/ContentPage/ContentPage';
import { getFile, getNavFromIndex } from 'src/utils/utils';

export const APP_TITLE = 'конспекты';
export const NOT_FOUND = 'Ошибка 404. Такая страница на сайте отсутствует!';

export const App = () => {
  const [currentPart, setCurrentPart] = useState({ id: 0, name: '', path: '' });
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
      <Suspense fallback={<Loader size="l" />}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PageWrapper
                  navSite={navSite}
                  currentPart={currentPart}
                  setCurrentPart={setCurrentPart}
                  isNotFound={false}
                />
              }
            >
              <Route
                index
                element={<MainPage setCurrentPart={setCurrentPart} />}
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
                        setCurrentPart={setCurrentPart}
                      />
                    }
                  />
                  <Route
                    path=":fileName"
                    key={'r' + val.id}
                    element={
                      <ContentPage
                        navItem={val}
                        setCurrentPart={setCurrentPart}
                      />
                    }
                  />
                </Route>
              ))}
            </Route>
            <Route
              path="*"
              element={
                <PageWrapper
                  navSite={navSite}
                  currentPart={currentPart}
                  setCurrentPart={setCurrentPart}
                  isNotFound={true}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};
