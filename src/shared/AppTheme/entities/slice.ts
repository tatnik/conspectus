import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * Перечисление доступных тем оформления.
 * @enum {string}
 */
export enum Theme {
  Light = 'light',
  Dark = 'dark',
  LightHC = 'light-hc',
  DarkHC = 'dark-hc',
}

/**
 * Массив всех доступных тем (для использования в UI).
 * @type {Theme[]}
 */
export const Themes: Theme[] = [Theme.Light, Theme.LightHC, Theme.Dark, Theme.DarkHC];

/**
 * Ключ для хранения темы в localStorage.
 * @type {string}
 */
export const LOCAL_STORAGE_THEME_KEY = 'theme';

/**
 * Значение темы по умолчанию.
 * Берется из localStorage, если есть сохраненное значение, иначе 'light'.
 * @type {Theme}
 */
const defaultTheme: Theme =
  ((typeof window === 'undefined'
    ? null
    : localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) as Theme) || Theme.Light;

/**
 * Redux-slice для управления темой приложения.
 *
 * @property {Theme} appTheme - Текущая выбранная тема.
 * @method setTheme - Устанавливает новую тему.
 */
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

/**
 * Экшен для установки темы.
 */
export const { setTheme } = themeSlice.actions;

/**
 * Редьюсер для темы приложения.
 */
export const { reducer: themeReducer } = themeSlice;
