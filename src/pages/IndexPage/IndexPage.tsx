import React, { SetStateAction, useLayoutEffect } from 'react';

import Nav, { TypeNavLink } from 'src/components/layout/Nav/Nav';

import cls from './IndexPage.module.scss';
import { PAGE_TITLE } from 'src/app/App';
import { getNavFromIndex } from 'src/utils/utils';
import { DataProvider } from 'src/utils/DataProvider';

export interface IndexPageProps {
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  navItem: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { setPageTitle, navItem, setCurrentPart } = props;
  const fileName = navItem.path + '/index.md';

  setPageTitle(`${PAGE_TITLE}  ${navItem.name} `);

  useLayoutEffect(() => {
    setCurrentPart(navItem);
  }, [navItem]);

  return (
    <main className={cls.IndexPage}>
      <DataProvider
        fileName={fileName}
        renderContent={(data) => <Nav nav={getNavFromIndex(data as string)} />}
      />
    </main>
  );
};
