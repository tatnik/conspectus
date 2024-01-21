import React from 'react';
import logo from 'src/assets/logo.svg';

import cls from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className={cls.Logo}>
      <Link to="/">
        <img
          src={logo}
          height="35px"
          alt="логотип"
        />
      </Link>
    </div>
  );
};
