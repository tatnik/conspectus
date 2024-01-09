import React from 'react';
import cls from './Footer.module.scss';
import { Label } from '@gravity-ui/uikit';
import { TypeNavLink } from 'src/markdown/navSite';
import { Logo } from 'src/components/layout/Logo/Logo';
import Nav from '../Nav/Nav';



export type FooterProps = {
  nav: Array<TypeNavLink>
};


export const Footer: React.FC<FooterProps> = ({ nav }) => {
  console.log(nav);

  return (
    <div className={cls.Footer}>
      <Logo />
      <Nav nav={nav} />
      <Label theme='info' >(С) 2024</Label>
    </div >
  );
}

