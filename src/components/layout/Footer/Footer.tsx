import React, { SetStateAction } from 'react';
import { Logo } from 'src/components/layout/Logo/Logo';

import { Button, Label } from '@gravity-ui/uikit';

import Nav, { TypeNavLink } from '../Nav/Nav';
import cls from './Footer.module.scss';

type FooterProps = {
  footerNav: Array<TypeNavLink>;
  currentPart: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
};

export const Footer: React.FC<FooterProps> = (props) => {
  const { footerNav, currentPart, setCurrentPart } = props;
  return (
    <div className={cls.Footer}>
      <Logo />
      <Nav
        nav={footerNav}
        classNameList={cls.nav}
        onClick={(val) => setCurrentPart(val as TypeNavLink)}
        renderProps={(val) => {
          return (
            <Button
              view="outlined"
              disabled={currentPart.id === val.id}
            >
              {val.name}
            </Button>
          );
        }}
      />
      <Label theme="info">(С) 2024</Label>
    </div>
  );
};
