import React from 'react';

import { Logo } from 'src/components/UI/Logo/Logo';
import cls from './Nav.module.scss';
import { TypeNavLink, APP_TITLE } from 'src/app/App';

import { Text } from '@gravity-ui/uikit';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { getFile, getNavFromIndex } from 'src/utils/utils';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const { currentPart, setCurrentPart, showPartNav, setShowPartNav, siteNav } = useAppContext();
  const [partNav, setPartNav] = React.useState([{ id: 0, name: '', path: '/' }]);

  const isMainPage = currentPart.id === 0;
  const isPartIndexPage = !isMainPage && !showPartNav;

  const getIndex = async () => {
    // считываем меню раздела из файла index.md
    const res = await getFile(`${currentPart.path}/index.md`);
    setPartNav(res.err === '' ? getNavFromIndex(res.text) : []);
  };

  React.useEffect(() => {
    if (!isMainPage) getIndex();
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
