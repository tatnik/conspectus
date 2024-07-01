import React from 'react';
import logo from 'src/assets/logo.svg';

import cls from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { Link as LinkGravity } from '@gravity-ui/uikit';

interface TypeLogoProps {
  logoText?: string;
}

export const Logo: React.FC<TypeLogoProps> = ({ logoText = '' }) => {
  return (
    <>
      <Link
        to="/"
        className={cls.Logo}
      >
        <img
          src={logo}
          height="35px"
          alt="логотип"
        />
        {logoText === '' ? null : <LinkGravity view="normal">Конспекты</LinkGravity>}
      </Link>
    </>
  );
};
