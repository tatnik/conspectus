import React, { ReactNode } from 'react';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  children: ReactNode[];
}

export const Sidebar = ({ children }: SidebarProps) => {
  return <aside className={cls.Sidebar}>{children} </aside>;
};
