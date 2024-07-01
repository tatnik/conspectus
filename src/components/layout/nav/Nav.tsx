import React from 'react';
import { Link } from 'react-router-dom';
import cls from './Nav.module.scss';

export interface TypeNavLink {
  id: number;
  name: string;
  path: string;
}

export interface TypeNavProps {
  nav: Array<TypeNavLink>;
  classNameList: string;
  classNameItem?: string;
  onClick?: (val?: TypeNavLink) => void;
  renderProps: (val: TypeNavLink) => React.JSX.Element;
}

export const Nav: React.FC<TypeNavProps> = ({
  nav,
  classNameList,
  classNameItem = '',
  onClick,
  renderProps,
}) => {
  return (
    <ul className={classNameList + ' ' + cls.Nav}>
      {nav.map((val) => (
        <li
          key={`li_${val.id}`}
          className={classNameItem}
        >
          <Link
            to={val.path}
            onClick={() => onClick}
          >
            {renderProps(val)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
