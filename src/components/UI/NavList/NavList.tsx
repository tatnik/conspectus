import React from 'react';

import cls from './NavList.module.scss';
import { NavLink } from 'react-router-dom';
import { TypeNavLink } from 'src/app/App';

export interface TypeNavListProps {
  navLinkArray: Array<TypeNavLink>;
  classNameList: string;
  classNameItem?: string;
  onClick?: (val?: TypeNavLink) => void;
  renderProps: (val: TypeNavLink) => React.JSX.Element;
}

export const NavList = (props: TypeNavListProps) => {
  const { navLinkArray, classNameList, classNameItem = '', onClick, renderProps } = props;
  return (
    <ul className={`${classNameList} ${cls.NavList}`}>
      {navLinkArray.map((val) => (
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

export default NavList;
