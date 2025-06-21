import React, { FC, ReactNode, useEffect } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';

interface ThemeProviderProps {
  children?: ReactNode;
}

export const saveTheme = (theme: string) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('theme', theme);
  }
};

export const AppThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const theme = useSelector((state: IRootState) => state.theme.appTheme);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
