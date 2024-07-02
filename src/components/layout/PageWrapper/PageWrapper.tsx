import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import cls from './PageWrapper.module.scss';
import { TypeNavLink } from '../Nav/Nav';
import { NotFound } from 'src/pages/NotFound/NotFound';

type PageWrapperProps = {
  navSite: Array<TypeNavLink>;
  isNotFound?: boolean;
};

export const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { navSite, isNotFound = false } = props;

  return (
    <>
      <Header />

      <div className={cls.PageWrapper}>
        {isNotFound ? <NotFound /> : null}
        <Outlet />
      </div>

      <Footer footerNav={navSite} />
    </>
  );
};

export default PageWrapper;
