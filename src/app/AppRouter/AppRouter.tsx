import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageWrapper } from 'src/components/layout/PageWrapper/PageWrapper';
import { BASENAME } from 'src/constants';

const ContentPage = React.lazy(() => import('src/pages/ContentPage/ContentPage'));
const IndexPage = React.lazy(() => import('src/pages/IndexPage/IndexPage'));
const NotFound = React.lazy(() => import('src/pages/NotFound/NotFound'));

export const AppRouter = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route
          path="/"
          element={<PageWrapper />}
        >
          <Route
            index
            element={<IndexPage />}
          />
          <Route
            path=":path/:fileName"
            element={<ContentPage />}
          />
          <Route
            path=":path"
            element={<IndexPage />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
