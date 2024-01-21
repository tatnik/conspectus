import React, { SetStateAction, useLayoutEffect, useState } from 'react';
import { ShowMd } from 'src/components/ShowMd/ShowMd';
import { getFile } from 'src/utils/useGetPost';

import cls from './MainPage.module.scss';

export interface MainPageProps {
  setTitlePage: React.Dispatch<SetStateAction<string>>;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const { setTitlePage } = props;
  setTitlePage('Конспекты'.toUpperCase());

  const fileName = '/readme.md';
  const [post, setPost] = useState('');

  //useGetPost({ fileName, setPost });

  const getPost = async () => {
    const res = await getFile(fileName);
    setPost(res.text);
    if (res.err !== '') {
      console.log(res.err);
    }
  };

  useLayoutEffect(() => {
    getPost();
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
