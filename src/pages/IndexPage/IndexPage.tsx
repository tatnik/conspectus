import React, { SetStateAction, useLayoutEffect, useState } from 'react';

import { getFile } from 'src/utils/useGetPost';

import { getNavFromIndex } from 'src/utils/getNavFromIndex';
import Nav, { TypeNavLink } from 'src/components/layout/Nav/Nav';

import cls from './IndexPage.module.scss';
import { PAGE_TITLE } from 'src/app/App';

export interface IndexPageProps {
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  navItem: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { setPageTitle, navItem, setCurrentPart } = props;
  setPageTitle(`${PAGE_TITLE}  ${navItem.name} `);

  const fileName = navItem.path + '/index.md';
  const [navPart, setNavPart] = useState([
    {
      id: 0,
      name: '',
      path: '',
    },
  ]);

  const getPostsList = async () => {
    const res = await getFile(fileName);
    if (res.err === '') {
      setNavPart(getNavFromIndex(res.text));
    } else {
      setNavPart([]);
      console.log(res.err);
    }
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
