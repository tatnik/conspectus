import React, { FC, ReactNode } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store';

interface ThemeProviderProps {
  children?: ReactNode;
}

export const AppThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const theme = useSelector((state: IRootState) => state.theme.appTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
