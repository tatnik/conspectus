import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import cls from './ContentPage.module.scss';

import { NotFound } from 'src/pages/NotFound/NotFound';
import { DataProvider } from 'src/data/DataProvider';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { apiGetNavItemByPath } from 'src/data/Api';
import { Post } from 'src/components/UI/Post/Post';

export const ContentPage = () => {
  const { setCurrentPart, setShowPartNav, siteNav } = useAppContext();
  const { path, fileName } = useParams();
  const navItem = apiGetNavItemByPath(path as string, siteNav);
  const contentName = `/${path}/${fileName}.md`;

  useLayoutEffect(() => {
    setCurrentPart(navItem);
    setShowPartNav(navItem.id > 0);
  }, [navItem]);

  return navItem.id === 0 ? (
    <NotFound />
  ) : (
    <main className={cls.ContentPage}>
      <DataProvider
        fileName={contentName}
        renderContent={(data) => <Post post={data as string} />}
      />
    </main>
  );
};
