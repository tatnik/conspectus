import React from 'react';

import { Logo } from 'src/components/layout/Logo/Logo';

import cls from './Header.module.scss';

import { ThemeSwitcher } from 'src/shared/AppTheme';
import { PopupNav } from '../PopupNav/PopupNav';
import { APP_TITLE } from 'src/app/App';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { Text } from '@gravity-ui/uikit';

export const Header = () => {
  const { currentPart, pageTitle } = useAppContext();
  const showNav = currentPart.id > 0;

  return (
    <header className={cls.Header}>
      <div className={cls.title}>
        <Logo logoText={APP_TITLE} />
        {showNav ? <PopupNav /> : null}
        <h1>
          <Text
            variant="header-1"
            color={'info'}
          >
            {currentPart.name}
          </Text>
          {pageTitle ? (
            <Text
              variant="header-1"
              color={'info'}
            >
              {` / ${pageTitle}`}
            </Text>
          ) : null}
        </h1>
      </div>
      <ThemeSwitcher />
    </header>
  );
};
