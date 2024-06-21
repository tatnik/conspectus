import React, { SetStateAction } from 'react';
import { Logo } from 'src/components/layout/Logo/Logo';

import { Label } from '@gravity-ui/uikit';

import Nav, { TypeNavLink } from '../Nav/Nav';
import cls from './Footer.module.scss';

type FooterProps = {
  footerNav: Array<TypeNavLink>;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
};

export const Footer: React.FC<FooterProps> = (props) => {
  const { footerNav, setCurrentPart } = props;
  return (
    <div className={cls.Footer}>
      <Logo />
      <Nav
        nav={footerNav}
        isFooter={true}
        setCurrentPart={setCurrentPart}
      />
      <Label theme="info">(С) 2024</Label>
    </div>
  );
};
