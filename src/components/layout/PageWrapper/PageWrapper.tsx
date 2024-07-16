import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import cls from './PageWrapper.module.scss';
import { TypeNavLink } from '../Nav/Nav';

type PageWrapperProps = {
  navSite: Array<TypeNavLink>;
  isNotFound?: boolean;
};

export const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { navSite } = props;

  return (
    <>
      <Header />

      <div className={cls.PageWrapper}>
        <Outlet />
      </div>

      <Footer footerNav={navSite} />
    </>
  );
};

export default PageWrapper;
