import React from 'react';
import { ThemeSwitcher } from 'src/app/providers/AppThemeProvider';
import { Logo } from 'src/components/layout/Logo/Logo';
import { TypeNavLink } from 'src/markdown/navSite';

import { Text, Link as LinkGravity, Button, Popup } from '@gravity-ui/uikit';

import cls from './Header.module.scss';
import { Link } from 'react-router-dom';

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
              <ul>
                {headerNav.map((val: TypeNavLink) => (
                  <li onClick={() => setOpen((prevOpen) => !prevOpen)}>
                    <Link
                      key={'h' + val.id}
                      to={val.path}
                    >
                      <LinkGravity>{val.name}</LinkGravity>
                    </Link>
                  </li>
                ))}
              </ul>
            </Popup>
          </>
        ) : null}
      </div>
      <ThemeSwitcher />
    </header>
  );
};
