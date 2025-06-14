import React, { useEffect } from 'react';

import { Logo } from 'src/components/UI/Logo/Logo';
import cls from './Nav.module.scss';
import { TypeNavLink } from 'src/types/nav';
import { APP_TITLE } from 'src/constants';

import { Text } from '@gravity-ui/uikit';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { apiGetPartNav } from 'src/data/Api';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const {
    currentPart,
    setCurrentPart,
    showPartNav,
    setShowPartNav,
    siteNav,
    partNavArray,
    setPartNavArray,
  } = useAppContext();

  const partNav = partNavArray[currentPart?.id] ? partNavArray[currentPart?.id] : [];
  const isMainPage = currentPart.id === 0;
  const isPartIndexPage = !isMainPage && !showPartNav;

  useEffect(() => {
    if (!isMainPage && partNav.length === 0) {
      // Если нет навигации для текущего раздела, получаем ее из файла
      apiGetPartNav(currentPart.id, siteNav[currentPart.id].path, partNavArray, setPartNavArray);
    }
  }, [currentPart]);

  // кнопка с главной навигацией (по разделам сайта)
  let mainNav = null;
  if (!isMainPage) {
    mainNav = (
      <NavPopup
        navLinks={siteNav.slice(1)}
        handleOnClick={(val) => {
          setCurrentPart(val as TypeNavLink);
          setShowPartNav(false);
        }}
      />
    );
  }

  // название/ссылка для индексной страницы текущего раздела
  let currentPartLink = null;
  if (isPartIndexPage) {
    // на индексной странице раздела ссылки нет, только название раздела
    currentPartLink = (
      <Text
        variant="header-1"
        color="info"
      >
        {currentPart.name}
      </Text>
    );
  } else if (!isMainPage) {
    // на всех прочих страницах ссылка на индексную страницу раздела
    currentPartLink = (
      <Link to={currentPart.path}>
        <Text
          variant="header-1"
          color="info"
        >
          {currentPart.name}
        </Text>
      </Link>
    );
  }

  // кнопка с навигацией по конспектам внутри раздела
  let conspectsNav = null;
  if (showPartNav && partNav.length > 0) {
    conspectsNav = (
      <NavPopup
        navLinks={partNav}
        handleOnClick={() => setShowPartNav(true)}
      />
    );
  }

  return (
    <nav className={cls.Nav}>
      <Logo logoText={APP_TITLE} />
      {mainNav}
      {currentPartLink}
      {conspectsNav}
    </nav>
  );
};
