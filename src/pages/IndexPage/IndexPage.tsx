import React, { SetStateAction, useLayoutEffect } from 'react';

import Nav, { TypeNavLink } from 'src/components/layout/Nav/Nav';

import cls from './IndexPage.module.scss';

import { getImgName, getNavFromIndex } from 'src/utils/utils';
import { DataProvider } from 'src/utils/DataProvider';
import { Card, Link as LinkGravity } from '@gravity-ui/uikit';

export interface IndexPageProps {
  navItem: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { navItem, setCurrentPart } = props;
  const fileName = navItem.path + '/index.md';

  useLayoutEffect(() => {
    setCurrentPart(navItem);
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
