import React, { SetStateAction } from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import cls from './PageWrapper.module.scss';
import { TypeNavLink } from '../Nav/Nav';
import { NotFound } from 'src/pages/NotFound/NotFound';

type PageWrapperProps = {
  navSite: Array<TypeNavLink>;
  currentPart: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
  isNotFound?: boolean;
};

export const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { navSite, currentPart, setCurrentPart, isNotFound = false } = props;

  return (
    <>
      <Header currentPart={currentPart} />

      <div className={cls.PageWrapper}>
        {isNotFound ? <NotFound /> : null}
        <Outlet />
      </div>

      <Footer
        footerNav={navSite}
        currentPart={currentPart}
        setCurrentPart={setCurrentPart}
      />
    </>
  );
};

export default PageWrapper;
