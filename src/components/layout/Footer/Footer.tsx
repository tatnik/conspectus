import React from 'react';
import { Logo } from 'src/components/layout/Logo/Logo';

import { Button, Label } from '@gravity-ui/uikit';

import Nav, { TypeNavLink } from 'src/components/layout/Nav/Nav';
import cls from './Footer.module.scss';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

export const Footer: React.FC = () => {
  const { currentPart, setCurrentPart, siteNav } = useAppContext();

  return (
    <div className={cls.Footer}>
      <Logo />
      <Nav
        nav={siteNav.slice(1)}
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
