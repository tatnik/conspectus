import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import cls from './PageWrapper.module.scss';

export const PageWrapper: React.FC = () => {
  return (
    <>
      <Header />
      <div className={cls.PageWrapper}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default PageWrapper;
