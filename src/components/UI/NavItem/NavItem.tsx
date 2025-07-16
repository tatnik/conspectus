import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { Link as GravityLink } from '@gravity-ui/uikit';
import cls from './NavItem.module.scss';

export interface NavItemProps extends Omit<LinkProps, 'to'> {
  to: string | { pathname?: string; hash?: string };
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Универсальный элемент списка навигации для меню, содержания и любых списков ссылок.
 * Всегда использует Link из react-router-dom, добавляет стили активного пункта (по модулю NavItem).
 * Если дочерний элемент — простой текст, применяет стили GravityLink; если передан блочный элемент (например, карточка), рендерит его как есть.
 *
 * @param {Object} props - Свойства компонента NavItem
 * @param {string|Object} props.to - Путь или объект маршрута для перехода (работает с роутером).
 * @param {boolean} [props.active] - Флаг для выделения активного пункта навигации.
 * @param {string} [props.className] - Дополнительный CSS-класс для элемента <li>.
 * @param {React.CSSProperties} [props.style] - Инлайн-стили для элемента <li>.
 * @param {React.ReactNode} props.children - Содержимое ссылки: текст, элемент, карточка.
 *
 * @returns {JSX.Element} Элемент списка <li> с маршрутизируемой ссылкой.
 */
export const NavItem: React.FC<NavItemProps> = ({
  to,
  active,
  className = '',
  style,
  children,
}) => {
  const combinedClass = [cls.NavItem, className, active ? cls.active : '']
    .filter(Boolean)
    .join(' ');
  // Если children — строка или простая верстка, используем GravityLink
  const isSimple =
    typeof children === 'string' ||
    (Array.isArray(children) && children.every((c) => typeof c === 'string'));

  return (
    <li
      className={combinedClass}
      style={style}
    >
      <RouterLink to={to}>
        {isSimple ? <GravityLink view="normal">{children}</GravityLink> : children}
      </RouterLink>
    </li>
  );
};
