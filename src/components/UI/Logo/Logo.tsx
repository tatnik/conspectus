import React from 'react';
import logo from 'src/assets/logo.svg';

import cls from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';

interface TypeLogoProps {
  logoText?: string;
}

export const Logo = (props: TypeLogoProps) => {
  const { logoText = '' } = props;
  return (
    <>
      <Link
        to="/"
        className={cls.Logo}
      >
        <img
          src={logo}
          height="40px"
          alt="логотип"
        />
        {logoText === '' ? null : (
          <Text
            variant="header-1"
            color={'info'}
          >
            Конспекты
          </Text>
        )}
      </Link>
    </>
  );
};
