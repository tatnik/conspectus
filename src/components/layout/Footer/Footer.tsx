import React from 'react';
import { Logo } from 'src/components/layout/Logo/Logo';
import { TypeNavLink } from 'src/markdown/navSite';

import { Label } from '@gravity-ui/uikit';

import Nav from '../Nav/Nav';
import cls from './Footer.module.scss';

export type FooterProps = {
  nav: Array<TypeNavLink>;
};

export const Footer: React.FC<FooterProps> = ({ nav }) => {
  return (
    <div className={cls.Footer}>
      <Logo />
      <Nav nav={nav} />
      <Label theme="info">(С) 2024</Label>
    </div>
  );
};
