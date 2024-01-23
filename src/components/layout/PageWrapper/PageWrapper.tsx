import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import cls from './PageWrapper.module.scss';
import { TypeNavLink } from '../Nav/Nav';

type PageWrapperProps = {
  titlePage: string;
  navPart: Array<TypeNavLink>;
  navSite: Array<TypeNavLink>;
};

export const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { titlePage, navPart, navSite } = props;
  return (
    <>
      <Header
        titlePage={titlePage}
        headerNav={navPart}
      />
      <div className={cls.PageWrapper}>
        <Outlet />
      </div>
      <Footer footerNav={navSite} />
    </>
  );
};

export default PageWrapper;
