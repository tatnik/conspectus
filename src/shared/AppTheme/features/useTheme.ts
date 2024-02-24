import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE_THEME_KEY, Theme, setTheme } from '../entities/slice';
import { IRootState } from 'src/store';

export const useTheme = () => {
  const theme: Theme = useSelector((state: IRootState) => state.theme.appTheme);
  const dispatch = useDispatch();

  const toggleTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};
