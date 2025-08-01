import React, { PropsWithChildren, useEffect } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';

/**
 * Сохраняет выбранную тему оформления в localStorage.
 *
 * @param {string} theme - Название выбранной темы ('light', 'dark', 'light-hc', 'dark-hc').
 * @returns {void}
 */
export const saveTheme = (theme: string) => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    window.localStorage.getItem('theme') !== theme
  ) {
    window.localStorage.setItem('theme', theme);
  }
};

/**
 * Провайдер темы для приложения.
 *
 * Оборачивает всё приложение в ThemeProvider Gravity UI и синхронизирует тему с redux и localStorage.
 *
 * @component
 * @param {PropsWithChildren} props - Дочерние элементы, которым требуется доступ к теме.
 * @returns {JSX.Element} Дерево с установленной темой.
 */
export const AppThemeProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const theme = useSelector((state: IRootState) => state.theme.appTheme);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
