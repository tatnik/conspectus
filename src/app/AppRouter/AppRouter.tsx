import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageWrapper } from 'src/components/layout/PageWrapper/PageWrapper';
import { ContentPage } from 'src/pages/ContentPage/ContentPage';
import { IndexPage } from 'src/pages/IndexPage/IndexPage';
//import { MainPage } from 'src/pages/MainPage/MainPage';
import { NotFound } from 'src/pages/NotFound/NotFound';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter basename="/conspectus">
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
