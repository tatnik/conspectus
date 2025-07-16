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
 * Для каждого элемента массива navLinkArray рендерит NavItem (ссылку или карточку).
 * Можно задать пользовательский рендер через renderProps.
 *
 * @param {Object} props - Свойства компонента NavList
 * @param {TypeNavLink[]} props.navLinkArray - Массив объектов навигации (id, name, path).
 * @param {string} props.classNameList - CSS-класс для <ul>.
 * @param {string} [props.classNameItem] - Дополнительный CSS-класс для каждого NavItem.
 * @param {boolean} [props.strictHash=false] - Если true, сравнивает и hash в урле (для якорей).
 * @param {(val: TypeNavLink) => React.ReactNode} props.renderProps - Функция для рендера содержимого пункта меню.
 *
 * @returns {JSX.Element} Список <ul> с пунктами меню/NavItem.
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
