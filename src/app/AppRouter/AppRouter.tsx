import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TypeNavLink } from 'src/components/layout/Nav/Nav';
import PageWrapper from 'src/components/layout/PageWrapper/PageWrapper';
import { ContentPage } from 'src/pages/ContentPage/ContentPage';
import { IndexPage } from 'src/pages/IndexPage/IndexPage';
import { MainPage } from 'src/pages/MainPage/MainPage';

interface TypeAppRouterProps {
  navSite: TypeNavLink[];
}

export const AppRouter: React.FC<TypeAppRouterProps> = (props) => {
  const { navSite } = props;
  return (
    <BrowserRouter basename="/conspectus">
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper
              navSite={navSite}
              isNotFound={false}
            />
          }
        >
          <Route
            path="/"
            element={<MainPage />}
          />
          {navSite.map((val) => (
            <Route
              path={val.path}
              key={'r' + val.id}
            >
              <Route
                index
                element={<IndexPage navItem={val} />}
              />
              <Route
                path=":fileName"
                key={'r' + val.id}
                element={<ContentPage navItem={val} />}
              />
            </Route>
          ))}
        </Route>
        <Route
          path="*"
          element={
            <PageWrapper
              navSite={navSite}
              isNotFound={true}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
