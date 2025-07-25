import React from 'react';
import styles from './ThemeIcons.module.scss';

/**
 * Иконка "Солнце" — для светлой темы.
 * Использует цвет currentColor, стили управляются через CSS-модуль.
 * @returns {JSX.Element} SVG-иконка солнца.
 */
export const Sun = () => (
  <svg
    className={`${styles.icon} ${styles.sunLight}`}
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="8"
      fill="currentColor"
      className={styles.strokeWhite1}
    />
  </svg>
);

/**
 * Иконка "Солнце" с акцентной обводкой.
 * Для светлой темы с высокой контрастностью (HC).
 * @returns {JSX.Element} SVG-иконка солнца с контрастной обводкой.
 */
export const SunHC = () => {
  return (
    <svg
      className={`${styles.icon} ${styles.sunHC}`}
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="currentColor"
        className={styles.strokeWhite2}
      />
    </svg>
  );
};

/**
 * Иконка "Луна" — для тёмной темы.
 * Круг, разделённый по вертикали на белую и чёрную части через градиент.
 * @returns {JSX.Element} SVG-иконка луны.
 */
export const Moon = () => {
  return (
    <svg
      className={`${styles.icon} ${styles.moonDark}`}
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient
          id="split"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop
            offset="50%"
            stopColor="#fff"
          />
          <stop
            offset="50%"
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="url(#split)"
        className={styles.strokeBlack1}
      />
    </svg>
  );
};

/**
 * Иконка "Луна" с акцентной обводкой, разделённая пополам.
 * Для тёмной темы с высокой контрастностью (HC).
 * @returns {JSX.Element} SVG-иконка луны с контрастной обводкой.
 */
export const MoonHC = () => {
  return (
    <svg
      className={`${styles.icon} ${styles.moonDarkHC}`}
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient
          id="split"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop
            offset="50%"
            stopColor="#fff"
          />
          <stop
            offset="50%"
            stopColor="currentColor"
          />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="url(#split)"
        className={styles.strokeBlack2}
      />
    </svg>
  );
};
