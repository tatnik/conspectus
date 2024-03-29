import React, { createContext } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  LightHC = 'light-hc',
  DarkHC = 'dark-hc',
}

export const Themes: Theme[] = [Theme.Light, Theme.LightHC, Theme.Dark, Theme.DarkHC];

export interface ThemeContextProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Light,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
  setTheme: () => { },
});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
