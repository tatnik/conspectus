import React, { useLayoutEffect } from 'react';

import NavList from 'src/components/UI/NavList/NavList';

import cls from './IndexPage.module.scss';

import { getImgName, getNavFromIndex, getNavItemByPath } from 'src/utils/utils';
import { DataProvider } from 'src/utils/DataProvider';
import { Card, Link as LinkGravity } from '@gravity-ui/uikit';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { useParams } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';

export const IndexPage: React.FC = () => {
  const { setCurrentPart, setPageTitle, setShowPartNav } = useAppContext();
  const { path } = useParams();

  const navItem = getNavItemByPath(path as string);

  if (navItem.id === 0 && path !== '' && path !== undefined) return <NotFound />;

  const fileName = navItem.id === 0 ? '/index.md' : navItem.path + '/index.md';

  useLayoutEffect(() => {
    setCurrentPart(navItem);
    setPageTitle('');
    setShowPartNav(false);
  }, [navItem]);

  return (
    <main className={cls.IndexPage}>
      <DataProvider
        fileName={fileName}
        renderContent={(data) => (
          <NavList
            navLinkArray={getNavFromIndex(data as string)}
            classNameList={cls.nav}
            classNameItem={cls.navItem}
            renderProps={function (val) {
              return (
                <Card className={cls.card}>
                  <img src={getImgName(val.path)} />
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
