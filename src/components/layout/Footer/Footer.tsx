import React from 'react';
import { Logo } from 'src/components/UI/Logo/Logo';
import { Label } from '@gravity-ui/uikit';
import cls from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={cls.Footer}>
      <Logo />
      <Label theme="info">(С) 2024</Label>
    </footer>
  );
};
