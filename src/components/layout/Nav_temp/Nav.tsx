import React, { useEffect } from 'react';

import { Logo } from 'src/components/UI/Logo/Logo';
import cls from './Nav.module.scss';
import { TypeNavLink, APP_TITLE } from 'src/app/App';

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

  const partNav = partNavArray[currentPart.id] ? partNavArray[currentPart.id] : [];
  const isMainPage = currentPart.id === 0;
  const isPartIndexPage = !isMainPage && !showPartNav;

  useEffect(() => {
    if (!isMainPage && partNav.length === 0) {
      // Если нет навигации для текущего раздела, получаем ее из файла
      apiGetPartNav(currentPart.id, siteNav[currentPart.id].path, partNavArray, setPartNavArray);
    }
  }, [currentPart]);

  return (
    <nav className={cls.Nav}>
      <Logo logoText={APP_TITLE} />

      {/* Список разделов 
      (показываем, если мы не на главной странице сайта) */}
      {isMainPage ? null : (
        <NavPopup
          navLinks={siteNav.slice(1)}
          handleOnClick={(val) => {
            setCurrentPart(val as TypeNavLink);
            setShowPartNav(false);
          }}
        />
      )}

      {/* Текущий раздел: */}

      {isPartIndexPage ? (
        <Text
          variant="header-1"
          color={'info'}
        >
          {currentPart.name}
        </Text>
      ) : null}

      {!isMainPage && !isPartIndexPage ? (
        <Link to={currentPart.path}>
          <Text
            variant="header-1"
            color={'info'}
          >
            {currentPart.name}
          </Text>
        </Link>
      ) : null}

      {/* Список топиков текущего раздела */}
      {showPartNav && partNav.length > 0 ? (
        <NavPopup
          navLinks={partNav}
          handleOnClick={() => {
            setShowPartNav(true);
          }}
        />
      ) : null}
    </nav>
  );
};
