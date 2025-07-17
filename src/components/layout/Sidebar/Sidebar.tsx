import React, { ReactNode } from 'react';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  children: ReactNode[];
}

/**
 * Боковая колонка страницы. Используется для навигации, дополнительного контента и т.п.
 *
 * @param {SidebarProps} props - Свойства компонента.
 * @param {ReactNode | ReactNode[]} props.children - Дочерние элементы (содержание сайдбара).
 *
 * @returns {JSX.Element} Боковая колонка (<aside>).
 */
export const Sidebar = ({ children }: SidebarProps) => {
  return <aside className={cls.Sidebar}>{children} </aside>;
};
