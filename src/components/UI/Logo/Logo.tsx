import React from 'react';
import logo from 'src/assets/logo.svg';

import cls from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';

interface TypeLogoProps {
  logoText?: string;
}

/**
 * Компонент Logo — универсальный логотип для верхней/нижней панели сайта.
 * Отображает картинку логотипа (svg, png и т.п.) и, опционально, текст рядом с логотипом.
 * При клике всегда ведёт на главную страницу ('/').
 *
 * @component
 *
 * @param {Object} props - Свойства компонента
 * @param {string} [props.logoText] - Текст, отображаемый справа от логотипа. Если не задан — текст не отображается.
 *
 * @returns {JSX.Element} Элемент <Link> с логотипом и текстом.
 */
export const Logo = (props: TypeLogoProps) => {
  const { logoText = '' } = props;
  return (
    <Link
      to="/"
      className={cls.Logo}
    >
      <img
        src={logo}
        height="40px"
        alt="логотип"
      />
      {logoText === '' ? null : (
        <Text
          variant="header-1"
          color={'info'}
        >
          {logoText}
        </Text>
      )}
    </Link>
  );
};
