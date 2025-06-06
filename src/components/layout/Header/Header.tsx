import React from 'react';

import cls from './Header.module.scss';

import { ThemeSwitcher } from 'src/shared/AppTheme';
import { Nav } from 'src/components/layout/Nav/Nav';

export const Header = () => {
  return (
    <header className={cls.Header}>
      <Nav />
      <ThemeSwitcher />
    </header>
  );
};
