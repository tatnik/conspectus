import React from 'react';
import { ThemeSwitcher } from 'src/app/providers/AppThemeProvider';
import { Logo } from 'src/components/layout/Logo/Logo';
import { TypeNavLink } from 'src/markdown/navSite';

import { DropdownMenu, Text } from '@gravity-ui/uikit';

import cls from './Header.module.scss';

export interface HeaderProps {
  titlePage: string;
  headerNav: Array<TypeNavLink>;
}

export const Header = (props: HeaderProps) => {
  const { titlePage, headerNav } = props;
  const showNav = headerNav[0] && !(headerNav[0].path === '/');
  const menuItems = headerNav.map((val) => ({
    href: val.path,
    text: val.name,
  }));

  return (
    <header className={cls.Header}>
      <Logo />
      <div>
        <Text
          variant="header-1"
          color={'info'}
        >
          {titlePage}
        </Text>
        {showNav ? <DropdownMenu items={menuItems} /> : null}
      </div>
      <ThemeSwitcher />
    </header>
  );
};
