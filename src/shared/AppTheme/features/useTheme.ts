import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE_THEME_KEY, Theme, setTheme } from '../entities/slice';
import { IRootState } from 'src/store';

/**
 * Хук для работы с темой оформления приложения.
 * Возвращает текущую тему и функцию для её смены с сохранением в localStorage.
 *
 *  @returns {{ theme: Theme, toggleTheme: function }} Объект с текущей темой и функцией переключения темы.
 */
export const useTheme = () => {
  const theme: Theme = useSelector((state: IRootState) => state.theme.appTheme);
  const dispatch = useDispatch();

  /**
   * Переключает тему оформления, сохраняет выбор в localStorage и Redux.
   *
   * @param {Theme} newTheme - Новая тема оформления ('light' | 'dark' и т.д.).
   * @returns {void}
   */
  const toggleTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};
