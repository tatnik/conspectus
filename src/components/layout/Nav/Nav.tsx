import React from 'react';

import { Logo } from 'src/components/UI/Logo/Logo';
import cls from './Nav.module.scss';
import { APP_TITLE } from 'src/constants';

import { useAppContext } from 'src/app/AppContext/AppContextProvider';

import { MainNav } from './MainNav';
import { CurrentPartLink } from './CurrentPartLink';
import { SectionNav } from './SectionNav';

export const Nav = () => {
  const { currentPart, showPartNav } = useAppContext();

  const isMainPage = currentPart.id === 0;
  const isPartIndexPage = !isMainPage && !showPartNav;

  return (
    <nav className={cls.Nav}>
      <Logo logoText={APP_TITLE} />
      <MainNav isMainPage={isMainPage} />
      <CurrentPartLink
        isMainPage={isMainPage}
        isPartIndexPage={isPartIndexPage}
      />
      <SectionNav />
    </nav>
  );
};
