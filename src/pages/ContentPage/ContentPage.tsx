import React, { SetStateAction, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShowMd } from 'src/components/ShowMd/ShowMd';

//import { getNavFromIndex } from 'src/utils/getNavFromIndex';
import { getFile } from 'src/utils/useGetPost';

import cls from './ContentPage.module.scss';
import { TypeNavLink } from 'src/components/layout/Nav/Nav';
import { NOT_FOUND, PAGE_TITLE } from 'src/app/App';
import { NotFound } from 'src/pages/NotFound/NotFound';

export interface ContentPageProps {
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  navItem: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const ContentPage: React.FC<ContentPageProps> = (props) => {
  const { setPageTitle, navItem, setCurrentPart } = props;

  console.log(navItem);

  const { fileName } = useParams();

  setPageTitle(`${PAGE_TITLE}  ${navItem.name} `);

  const contentName = navItem.path + '/' + fileName + '.md';

  const [post, setPost] = useState('');

  const getPost = async () => {
    const res = await getFile(contentName);
    if (res.err === '') {
      setPost(res.text);
    } else {
      console.log(res.err);
      setPost(NOT_FOUND);
    }
  };

  useLayoutEffect(() => {
    getPost();
    setCurrentPart(navItem);
  }, [navItem, fileName]);

  return navItem.id === 0 ? (
    <NotFound />
  ) : (
    <main className={cls.ContentPage}>
      <ShowMd
        post={post}
        isIndex={false}
      />
    </main>
  );
};
