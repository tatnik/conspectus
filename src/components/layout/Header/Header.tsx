import React from 'react';

import cls from './Header.module.scss';

import { ThemeSwitcher } from 'src/shared/AppTheme';
import { AppNav } from 'src/components/layout/AppNav/AppNav';
import Search from 'src/components/UI/Search/Search';

/**
 * Header — верхняя панель сайта с навигацией, поиском и переключателем темы.
 * Включает:
 * - AppNav (главная навигация)
 * - Search (поиск по сайту)
 * - ThemeSwitcher (смена темы)
 *
 * @returns {JSX.Element} Контейнер <header> со всеми элементами верхней панели.
 */
export const Header = () => {
  return (
    <header className={cls.Header}>
      <AppNav />
      <Search />
      <ThemeSwitcher />
    </header>
  );
};
