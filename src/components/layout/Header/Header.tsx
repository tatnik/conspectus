import React from 'react';

import { Logo } from 'src/components/layout/Logo/Logo';

import { Text } from '@gravity-ui/uikit';

import cls from './Header.module.scss';

import { ThemeSwitcher } from 'src/shared/AppTheme';
import { PopupNav } from '../PopupNav/PopupNav';
import { APP_TITLE } from 'src/app/App';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

export const Header = () => {
  const { currentPart } = useAppContext();
  const showNav = currentPart.id > 0;

  return (
    <header className={cls.Header}>
      <Logo logoText={APP_TITLE} />
      <div>
        <Text
          variant="header-1"
          color={'info'}
          className={cls.title}
        >
          {currentPart.name}
        </Text>
        {showNav ? <PopupNav /> : null}
      </div>
      <ThemeSwitcher />
    </header>
  );
};
