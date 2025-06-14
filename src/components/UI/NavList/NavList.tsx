import React from 'react';

import cls from './NavList.module.scss';
import { NavLink } from 'react-router-dom';
import { TypeNavLink } from 'src/types/nav';

export interface TypeNavListProps {
  navLinkArray: TypeNavLink[];
  classNameList: string;
  classNameItem?: string;
  renderProps: (val: TypeNavLink) => React.ReactNode;
}

export const NavList = (props: TypeNavListProps) => {
  const { navLinkArray, classNameList, classNameItem = '', renderProps } = props;
  return (
    <ul className={`${classNameList} ${cls.NavList}`}>
      {navLinkArray.map((val) => (
        <li
          key={`li_${val.id}`}
          className={classNameItem}
        >
          <NavLink
            to={val.path}
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
