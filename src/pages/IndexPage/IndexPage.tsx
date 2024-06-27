import React, { SetStateAction, useLayoutEffect, useState } from 'react';

import Nav, { TypeNavLink } from 'src/components/layout/Nav/Nav';

import cls from './IndexPage.module.scss';
import { PAGE_TITLE } from 'src/app/App';
import { getFile, getNavFromIndex } from 'src/utils/utils';

export interface IndexPageProps {
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  navItem: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { setPageTitle, navItem, setCurrentPart } = props;
  const fileName = navItem.path + '/index.md';
  const [navPart, setNavPart] = useState([
    {
      id: 0,
      name: '',
      path: '',
    },
  ]);

  setPageTitle(`${PAGE_TITLE}  ${navItem.name} `);

  const getPostsList = async () => {
    const res = await getFile(fileName);
    setNavPart(res.err === '' ? getNavFromIndex(res.text) : []);
  };

  useLayoutEffect(() => {
    getPostsList();
    setCurrentPart(navItem);
  }, [navItem]);

  return (
    <main className={cls.IndexPage}>
      <Nav nav={navPart} />
    </main>
  );
};
