import React from 'react';
import { Logo } from 'src/components/layout/Logo/Logo';

import { Button, Label } from '@gravity-ui/uikit';

import Nav, { TypeNavLink } from 'src/components/layout/Nav/Nav';
import cls from './Footer.module.scss';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

type FooterProps = {
  footerNav: Array<TypeNavLink>;
};

export const Footer: React.FC<FooterProps> = (props) => {
  const { footerNav } = props;
  const { currentPart, setCurrentPart } = useAppContext();

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
