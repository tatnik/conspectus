import React from 'react';
import { useLocation } from 'react-router-dom';
import cls from './NavList.module.scss';
import { TypeNavLink } from 'src/types/nav';
import { NavItem } from 'src/components/UI/NavItem/NavItem';

export interface TypeNavListProps {
  navLinkArray: TypeNavLink[];
  classNameList: string;
  classNameItem?: string;
  strictHash?: boolean;
  renderProps: (val: TypeNavLink) => React.ReactNode;
}

const safeDecode = (str: string) => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

/**
 * Список навигации — универсальный компонент для отображения меню, структуры или разделов.
 *
 * @param props Свойства компонента NavList
 * @returns Список <ul> с пунктами меню/NavItem.
 */
export const NavList: React.FC<TypeNavListProps> = ({
  navLinkArray,
  classNameList,
  classNameItem = '',
  renderProps,
  strictHash = false,
}) => {
  const location = useLocation();
  const currentFullPath = location.pathname + (strictHash ? safeDecode(location.hash) : '');

  return (
    <ul className={`${classNameList} ${cls.NavList}`}>
      {navLinkArray.map((val) => {
        const targetPath = safeDecode(val.path);
        const isActive = currentFullPath === targetPath;
        return (
          <NavItem
            key={val.id}
            to={val.path}
            active={isActive}
            className={classNameItem}
          >
            {renderProps(val)}
          </NavItem>
        );
      })}
    </ul>
  );
};

export default NavList;
