import React from 'react';

import { Logo } from 'src/components/layout/Logo/Logo';

import { Text, Button, Popup } from '@gravity-ui/uikit';

import cls from './Header.module.scss';

import { Nav, TypeNavLink } from '../Nav/Nav';
import { ThemeSwitcher } from 'src/shared/AppTheme';

export interface HeaderProps {
  titlePage: string;
  headerNav: Array<TypeNavLink>;
}

export const Header = (props: HeaderProps) => {
  const { titlePage, headerNav } = props;
  const showNav = headerNav[0] && !(headerNav[0].path === '/');
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

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
        {showNav ? (
          <>
            <Button
              ref={buttonRef}
              onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
              ...
            </Button>
            <Popup
              anchorRef={buttonRef}
              open={open}
              placement="bottom"
            >
              <Nav
                nav={headerNav}
                onClick={() => setOpen((prevOpen) => !prevOpen)}
              />
            </Popup>
          </>
        ) : null}
      </div>
      <ThemeSwitcher />
    </header>
  );
};
