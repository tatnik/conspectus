import React from 'react';

import { Logo } from 'src/components/layout/Logo/Logo';

import { Text } from '@gravity-ui/uikit';

import cls from './Header.module.scss';

import { TypeNavLink } from '../Nav/Nav';
import { ThemeSwitcher } from 'src/shared/AppTheme';
import { PopupNav } from '../PopupNav/PopupNav';

export interface HeaderProps {
  titlePage: string;
  currentPart: TypeNavLink;
}

export const Header = (props: HeaderProps) => {
  const { titlePage, currentPart } = props;
  const showNav = currentPart.id > 0;

  return (
    <header className={cls.Header}>
      <Logo />
      <div>
        <Text
          variant="header-1"
          color={'info'}
        >
          {titlePage + ' '}
        </Text>
        {showNav ? <PopupNav currentPart={currentPart} /> : null}
      </div>
      <ThemeSwitcher />
    </header>
  );
};
