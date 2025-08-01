import React from 'react';
import { Logo } from 'src/components/UI/Logo/Logo';
import { Label } from '@gravity-ui/uikit';
import cls from './Footer.module.scss';
import { ThemeSwitcher } from 'src/shared/AppTheme';

/**
 * Footer — нижняя часть сайта с логотипом и копирайтом.
 *
 * @returns {JSX.Element} Контейнер <footer> с логотипом и копирайтом.
 */
export const Footer = () => {
  return (
    <footer className={cls.Footer}>
      <Logo />
      <ThemeSwitcher />
      <Label theme="info">© {new Date().getFullYear()}</Label>
    </footer>
  );
};
