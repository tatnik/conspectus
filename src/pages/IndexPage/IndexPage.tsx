import React, { SetStateAction, useLayoutEffect, useState } from 'react';

import { getFile } from 'src/utils/useGetPost';

import { getNavFromIndex } from 'src/utils/getNavFromIndex';
import Nav, { TypeNavLink } from 'src/components/layout/Nav/Nav';

import cls from './IndexPage.module.scss';

export interface IndexPageProps {
  setTitlePage: React.Dispatch<SetStateAction<string>>;
  navItem: TypeNavLink;
}

export const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { setTitlePage, navItem } = props;
  setTitlePage(`КОНСПЕКТЫ  ${navItem.name} `);

  const fileName = navItem.path + '/index.md';
  const [navPart, setNavPart] = useState([
    {
      id: 0,
      name: '',
      path: '',
    },
  ]);

  const getPost = async () => {
    const res = await getFile(fileName);
    if (res.err === '') {
      setNavPart(getNavFromIndex(res.text));
    } else {
      setNavPart([]);
      console.log(res.err);
    }
  };

  useLayoutEffect(() => {
    getPost();
  }, [navItem]);

  return (
    <main className={cls.IndexPage}>
      <Nav nav={navPart} />
    </main>
  );
};
