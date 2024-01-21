import React, { SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShowMd } from 'src/components/ShowMd/ShowMd';
import { TypeNavLink } from 'src/markdown/navSite';
import { getNavFromIndex } from 'src/utils/getNavFromIndex';
import { getFile } from 'src/utils/useGetPost';

import cls from './ContentPage.module.scss';

export interface ContentPageProps {
  setTitlePage: React.Dispatch<SetStateAction<string>>;
  setNavPart: React.Dispatch<React.SetStateAction<TypeNavLink[]>>;
  navItem: TypeNavLink;
}

export const ContentPage: React.FC<ContentPageProps> = (props) => {
  const { setTitlePage, setNavPart, navItem } = props;

  const { fileName } = useParams();

  setTitlePage(`КОНСПЕКТЫ  ${navItem.name} `);

  const indexName = navItem.path + '/index.md';
  const contentName = navItem.path + '/' + fileName + '.md';

  const [post, setPost] = useState('');
  const [index, setIndex] = useState('');

  const getIndex = async () => {
    const res = await getFile(indexName);
    setIndex(res.text);
    if (res.err !== '') {
      console.log(res.err);
    }
  };

  const getPost = async () => {
    const res = await getFile(contentName);
    setPost(res.text);
    if (res.err !== '') {
      console.log(res.err);
    }
  };

  useLayoutEffect(() => {
    getPost();
    getIndex();
  }, [navItem]);

  useEffect(() => {
    const navFromIndex = getNavFromIndex(index);
    setNavPart(navFromIndex);
  }, [index, setNavPart]);

  return (
    <main className={cls.ContentPage}>
      <ShowMd
        post={post}
        isIndex={false}
      />
    </main>
  );
};
