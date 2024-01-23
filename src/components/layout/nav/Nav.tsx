import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import { Button, Link as LinkGravity } from '@gravity-ui/uikit';
import cls from './Nav.module.scss';

export interface TypeNavLink {
  id: number;
  name: string;
  path: string;
}

export interface TypeNavProps {
  nav: Array<TypeNavLink>;
  isButton?: boolean;
  onClick?: () => void;
}

export const Nav: React.FC<TypeNavProps> = ({ nav, isButton, onClick }) => {
  const pageUrl = useLocation().pathname;
  return (
    <ul className={cls.Nav}>
      {nav.map((val) => (
        <li key={`li_${val.id}`}>
          <Link
            to={val.path}
            onClick={onClick}
          >
            {isButton ? (
              <Button
                view="outlined"
                disabled={pageUrl === val.path}
              >
                {val.name}
              </Button>
            ) : (
              <LinkGravity>{val.name}</LinkGravity>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;

// <LinkGravity key={`l_${keyName}${val.id}`}>{val.name}</LinkGravity>
