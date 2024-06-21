import React, { SetStateAction } from 'react';
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
  isFooter?: boolean;
  onClick?: () => void;
  setCurrentPart?: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const Nav: React.FC<TypeNavProps> = ({ nav, isFooter = false, setCurrentPart }) => {
  const pageUrl = useLocation().pathname;
  const clickHandler = (val: TypeNavLink) => {
    if (isFooter && setCurrentPart) {
      setCurrentPart(val);
    }
  };

  return (
    <ul className={cls.Nav}>
      {nav.map((val) => (
        <li key={`li_${val.id}`}>
          <Link
            to={val.path}
            onClick={() => clickHandler(val)}
          >
            {isFooter ? (
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
