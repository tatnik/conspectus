import React from 'react';
import { Select } from '@gravity-ui/uikit';
import cls from './ThemeSwitcher.module.scss';
import { useTheme } from 'src/app/providers/AppThemeProvider';
import { Themes } from 'src/app/providers/AppThemeProvider/lib/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={cls.ThemeSwitcher}>
      <Select
        value={[String(theme)]}
        placeholder="Values"
        onUpdate={(nextValue) => toggleTheme(Themes[Number(nextValue[0])])}
        label="Тема:"
        width={130}
      >
        {Themes.map((val, i) => (
          <Select.Option
            key={i}
            value={String(i)}
            disabled={theme === val}
          >
            {val}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
