import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './shared/AppTheme';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
