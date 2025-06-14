// Не убирать default экспорт! Используется для ленивого импорта, именованный нужен для автогенерации тестов

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { DataProvider } from 'src/data/DataProvider';
import { apiGetImgName, apiGetNavFromIndex, apiGetNavItemByPath } from 'src/data/Api';

import { NavList } from 'src/components/UI/NavList/NavList';
import { Card, Link as LinkGravity } from '@gravity-ui/uikit';
import { NotFound } from 'src/pages/NotFound/NotFound';

import cls from './IndexPage.module.scss';

export const IndexPage = () => {
  const { setCurrentPart, setShowPartNav, siteNav } = useAppContext();
  const { path } = useParams();

  const navItem = useMemo(() => apiGetNavItemByPath(path as string, siteNav), [path, siteNav]);

  if (navItem.id === 0 && path !== '' && path !== undefined) return <NotFound />;

  const fileName = useMemo(
    () => (navItem.id === 0 ? '/index.md' : navItem.path + '/index.md'),
    [navItem]
  );

  useEffect(() => {
    setCurrentPart(navItem);
    setShowPartNav(false);
  }, [navItem]);

  const renderNavList = (data: string) => (
    <NavList
      navLinkArray={apiGetNavFromIndex(data)}
      classNameList={cls.nav}
      classNameItem={cls.navItem}
      renderProps={(val) => (
        <Card className={cls.card}>
          <img
            src={apiGetImgName(val.path)}
            loading="lazy"
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
