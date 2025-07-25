import React from 'react';

import { Tooltip, Button, Label } from '@gravity-ui/uikit';

import cls from './ThemeSwitcher.module.scss';
import { Themes, useTheme } from './../../index';
import { Moon, MoonHC, Sun, SunHC } from '../TemeIcons/ThemeIcons';

const themeTitles = ['Светлая', 'Светлая HC', 'Тёмная', 'Тёмная HC'];

/** @type {JSX.Element[]} Иконки для каждой темы в порядке: [Светлая, Светлая HC, Тёмная, Тёмная HC] */
const themeIcons = [
  <Sun key="sun" />,
  <SunHC key="sun-hc" />,
  <Moon key="moon" />,
  <MoonHC key="moon-hc" />,
];

/**
 * Компонент переключения тем оформления (ThemeSwitcher).
 *
 * Отображает четыре кнопки с иконками — для светлой, светлой HC, тёмной и тёмной HC тем.
 * Выбранная тема выделяется. При наведении показывается подсказка с названием темы.
 *
 * @returns {JSX.Element} Группа кнопок для переключения темы оформления.
 */
export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const currentIdx = Themes.findIndex((t) => t === theme);
  return (
    <div className={cls.ThemeSwitcher}>
      <Label
        theme="info"
        className={cls.label}
      >
        Тема:
      </Label>

      {Themes.map((th, i) => (
        <Tooltip
          key={th}
          content={themeTitles[i]}
        >
          <Button
            view={currentIdx === i ? 'outlined' : 'flat'}
            size="s"
            onClick={() => toggleTheme(th)}
            aria-label={themeTitles[i]}
            selected={currentIdx === i}
          >
            {themeIcons[i]}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};
