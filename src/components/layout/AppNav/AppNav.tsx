import React from 'react';

import { Logo } from 'src/components/UI/Logo/Logo';
import cls from './AppNav.module.scss';
import { APP_TITLE } from 'src/constants';

import { useAppContext } from 'src/app/AppContext/AppContextProvider';

import { PartsNavPopup } from './PartsNavPopup/PartsNavPopup';
import { CurrentPartTitle } from './CurrentPartTitle/CurrentPartTitle';
import { ConspectsNavPopup } from './ConspectsNavPopup/ConspectsNavPopup';

/**
 * Главный навигационный контейнер приложения.
 * Включает логотип, выпадающее меню по разделам (Parts), заголовок/ссылку текущего раздела,
 * и выпадающее меню по конспектам (Conspects) текущего раздела.
 *
 * @component
 * @returns {JSX.Element} Корневой nav-контейнер приложения.
 */
export const AppNav: React.FC = () => {
  const { currentPart, showPartNav } = useAppContext();

  const isMainPage = currentPart.id === 0;
  const isPartIndexPage = !isMainPage && !showPartNav;

  return (
    <nav className={cls.AppNav}>
      <Logo logoText={APP_TITLE} />
      <PartsNavPopup isMainPage={isMainPage} />
      <CurrentPartTitle
        isMainPage={isMainPage}
        isPartIndexPage={isPartIndexPage}
      />
      <ConspectsNavPopup />
    </nav>
  );
};
