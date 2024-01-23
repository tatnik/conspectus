import React from 'react';
import { Logo } from 'src/components/layout/Logo/Logo';

import { Label } from '@gravity-ui/uikit';

import Nav, { TypeNavLink } from '../Nav/Nav';
import cls from './Footer.module.scss';

type FooterProps = {
  footerNav: Array<TypeNavLink>;
};

export const Footer: React.FC<FooterProps> = (props) => {
  const { footerNav } = props;
  return (
    <div className={cls.Footer}>
      <Logo />
      <Nav
        nav={footerNav}
        isButton={true}
      />
      <Label theme="info">(С) 2024</Label>
    </div>
  );
};
