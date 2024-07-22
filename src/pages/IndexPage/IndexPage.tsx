import React, { useLayoutEffect } from 'react';

import Nav from 'src/components/layout/Nav/Nav';

import cls from './IndexPage.module.scss';

import { getImgName, getNavFromIndex, getNavItemByPath } from 'src/utils/utils';
import { DataProvider } from 'src/utils/DataProvider';
import { Card, Link as LinkGravity } from '@gravity-ui/uikit';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { useParams } from 'react-router-dom';
import { NotFound } from '../NotFound/NotFound';

export const IndexPage: React.FC = () => {
  const { setCurrentPart, setPageTitle } = useAppContext();
  const { path } = useParams();

  const navItem = getNavItemByPath(path as string);

  if (navItem.id === 0 && path !== '' && path !== undefined) return <NotFound />;

  const fileName = navItem.id === 0 ? '/index.md' : navItem.path + '/index.md';

  useLayoutEffect(() => {
    setCurrentPart(navItem);
    setPageTitle('');
  }, [navItem]);

  return (
    <main className={cls.IndexPage}>
      <DataProvider
        fileName={fileName}
        renderContent={(data) => (
          <Nav
            nav={getNavFromIndex(data as string)}
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
