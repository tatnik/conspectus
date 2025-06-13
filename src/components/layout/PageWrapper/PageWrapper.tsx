import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from 'src/components/layout/Header/Header';
import { Footer } from 'src/components/layout/Footer/Footer';

import cls from './PageWrapper.module.scss';

export const PageWrapper = () => {
  return (
    <>
      <Header />
      <main className={cls.PageWrapper}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
