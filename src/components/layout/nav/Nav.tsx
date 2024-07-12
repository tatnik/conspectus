import React from 'react';

import cls from './Nav.module.scss';
import { NavLink } from 'react-router-dom';

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
          <NavLink
            to={val.path}
            onClick={() => onClick}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
              };
            }}
          >
            {renderProps(val)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
