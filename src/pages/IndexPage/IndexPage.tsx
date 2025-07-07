// Не убирать default экспорт! Используется для ленивого импорта, именованный нужен для автогенерации тестов

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { DataProvider } from 'src/data/DataProvider';

import { NavList } from 'src/components/UI/NavList/NavList';
import { Card, Link as LinkGravity } from '@gravity-ui/uikit';
import { NotFound } from 'src/pages/NotFound/NotFound';

import cls from './IndexPage.module.scss';
import { getImgName, getNavItemByPath } from 'src/utils/helpers';
import { parseNavFromIndex } from 'src/utils/parsers';

export const IndexPage = () => {
  const { setCurrentPart, setShowPartNav, siteNav } = useAppContext();
  const { path } = useParams();

  const seekPath = path ?? '';

  const navItem = useMemo(() => getNavItemByPath(seekPath, siteNav), [seekPath, siteNav]);

  const fileName = useMemo(
    () => (navItem.id === 0 ? '/index.md' : navItem.path + '/index.md'),
    [navItem]
  );

  useEffect(() => {
    setCurrentPart(navItem);
    setShowPartNav(false);
  }, [navItem]);

  if (navItem.id === 0 && path !== '' && path !== undefined) return <NotFound />;

  const renderNavList = (data: string) => (
    <NavList
      navLinkArray={parseNavFromIndex(data)}
      classNameList={cls.nav}
      classNameItem={cls.navItem}
      renderProps={(val) => (
        <Card className={cls.card}>
          <img
            src={getImgName(val.path)}
            loading="lazy"
            alt={val.name}
          />
          <LinkGravity>{val.name}</LinkGravity>
        </Card>
      )}
    />
  );

  return (
    <div className={cls.IndexPage}>
      <DataProvider
        fileName={fileName}
        renderContent={renderNavList}
      />
    </div>
  );
};

export default IndexPage;
