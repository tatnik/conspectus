import React, { useLayoutEffect } from 'react';

import { NavList } from 'src/components/UI/NavList/NavList';

import cls from './IndexPage.module.scss';

import { apiGetImgName, apiGetNavFromIndex, apiGetNavItemByPath } from 'src/data/Api';
import { DataProvider } from 'src/data/DataProvider';
import { Card, Link as LinkGravity } from '@gravity-ui/uikit';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { useParams } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';

export const IndexPage = () => {
  const { setCurrentPart, setShowPartNav, siteNav } = useAppContext();
  const { path } = useParams();

  const navItem = apiGetNavItemByPath(path as string, siteNav);

  if (navItem.id === 0 && path !== '' && path !== undefined) return <NotFound />;

  const fileName = navItem.id === 0 ? '/index.md' : navItem.path + '/index.md';

  useLayoutEffect(() => {
    setCurrentPart(navItem);
    setShowPartNav(false);
  }, [navItem]);

  return (
    <main className={cls.IndexPage}>
      <DataProvider
        fileName={fileName}
        renderContent={(data) => (
          <NavList
            navLinkArray={apiGetNavFromIndex(data as string)}
            classNameList={cls.nav}
            classNameItem={cls.navItem}
            renderProps={function (val) {
              return (
                <Card className={cls.card}>
                  <img src={apiGetImgName(val.path)} />
                  <LinkGravity>{val.name}</LinkGravity>
                </Card>
              );
            }}
          />
        )}
      />
    </main>
  );
};

export default IndexPage;
