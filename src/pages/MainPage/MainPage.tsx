import React, { SetStateAction, useLayoutEffect, useState } from 'react';
import { ShowMd } from 'src/components/ShowMd/ShowMd';
import { getFile } from 'src/utils/useGetPost';

import cls from './MainPage.module.scss';
import { TypeNavLink } from './../../components/layout/Nav/Nav';
import { PAGE_TITLE } from 'src/app/App';

export interface MainPageProps {
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const { setPageTitle, setCurrentPart } = props;
  setPageTitle(PAGE_TITLE.toUpperCase());

  const fileName = '/readme.md';
  const [post, setPost] = useState('');

  //useGetPost({ fileName, setPost });

  const getPost = async () => {
    const res = await getFile(fileName);
    setPost(res.text);
    if (res.err !== '') {
      setPost('Что-то пошло не так! Данные отсутствуют!');
    }
  };

  useLayoutEffect(() => {
    getPost();
    setCurrentPart({ id: 0, name: '', path: '' });
  }, []);

  return (
    <main className={cls.MainPage}>
      <ShowMd
        post={post}
        isIndex={true}
      />
    </main>
  );
};
