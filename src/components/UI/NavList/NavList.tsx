import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cls from './NavList.module.scss';
import { TypeNavLink } from 'src/types/nav';

export interface TypeNavListProps {
  navLinkArray: TypeNavLink[];
  classNameList: string;
  classNameItem?: string;
  strictHash?: boolean;
  renderProps: (val: TypeNavLink) => React.ReactNode;
  activeClassName?: string;
}

function safeDecode(str: string) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

export const NavList: React.FC<TypeNavListProps> = ({
  navLinkArray,
  classNameList,
  classNameItem = '',
  renderProps,
  strictHash = false,
  activeClassName = '',
}) => {
  const location = useLocation();
  const currentFullPath = location.pathname + (strictHash ? safeDecode(location.hash) : '');
  const activeClass = activeClassName === '' ? cls.activeLink : activeClassName;

  return (
    <ul className={`${classNameList} ${cls.NavList}`}>
      {navLinkArray.map((val) => {
        const targetPath = safeDecode(val.path);
        const isActive = currentFullPath === targetPath;
        return (
          <li
            key={`li_${val.id}`}
            className={`${classNameItem} ${isActive ? activeClass : ''}`.trim()}
          >
            <Link to={val.path}>{renderProps(val)}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavList;
