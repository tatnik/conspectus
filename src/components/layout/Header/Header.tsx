import React from 'react';

import cls from './Header.module.scss';

import { ThemeSwitcher } from 'src/shared/AppTheme';
import { AppNav } from 'src/components/layout/AppNav/AppNav';
import Search from 'src/components/UI/Search/Search';

export const Header = () => {
  return (
    <header className={cls.Header}>
      <AppNav />
      <Search />
      <ThemeSwitcher />
    </header>
  );
};
