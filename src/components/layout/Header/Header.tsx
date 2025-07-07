import React from 'react';

import cls from './Header.module.scss';

import { ThemeSwitcher } from 'src/shared/AppTheme';
import { Nav } from 'src/components/layout/Nav/Nav';
import Search from 'src/components/UI/Search/Search';

export const Header = () => {
  return (
    <header className={cls.Header}>
      <Nav />
      <Search />
      <ThemeSwitcher />
    </header>
  );
};
