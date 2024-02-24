import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  LightHC = 'light-hc',
  DarkHC = 'dark-hc',
}

export const Themes: Theme[] = [Theme.Light, Theme.LightHC, Theme.Dark, Theme.DarkHC];

export const LOCAL_STORAGE_THEME_KEY = 'theme';

const defaultTheme: Theme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.Light;

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    appTheme: defaultTheme,
  },
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.appTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const { reducer: themeReducer } = themeSlice;
