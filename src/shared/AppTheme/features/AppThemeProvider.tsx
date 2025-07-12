import React, { PropsWithChildren, useEffect } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';

export const saveTheme = (theme: string) => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    window.localStorage.getItem('theme') !== theme
  ) {
    window.localStorage.setItem('theme', theme);
  }
};

export const AppThemeProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const theme = useSelector((state: IRootState) => state.theme.appTheme);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
