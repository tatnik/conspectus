import React, { SetStateAction, useLayoutEffect, useState } from 'react';

import { TypeNavLink } from 'src/markdown/navSite';
import { getFile } from 'src/utils/useGetPost';

import cls from './IndexPage.module.scss';
import { Link } from 'react-router-dom';
import { getNavFromIndex } from 'src/utils/getNavFromIndex';
import { Link as LinkGravity } from '@gravity-ui/uikit';

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
      <ul>
        {navPart.map((val: TypeNavLink) => (
          <li key={val.id}>
            <Link
              key={val.id}
              to={val.path}
            >
              <LinkGravity>{val.name}</LinkGravity>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
