import React from 'react';
import logo from 'src/assets/logo.svg';

import { Link } from '@gravity-ui/uikit';

import cls from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={cls.Logo}>
      <Link href="/">
        <img
          src={logo}
          height="35px"
          alt="логотип"
        />
      </Link>
    </div>
  );
};
