// Не убирать default экспорт! Используется для ленивого импорта, именованный нужен для автогенерации тестов

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { DataProvider } from 'src/data/DataProvider';

import { Post } from 'src/components/UI/Post/Post';
import { NotFound } from 'src/pages/NotFound/NotFound';

import cls from './ContentPage.module.scss';
import { getNavItemByPath } from 'src/data/helpers';

export const ContentPage = () => {
  const { path = '', fileName = '' } = useParams<{ path?: string; fileName?: string }>();
  const { setCurrentPart, setShowPartNav, siteNav } = useAppContext();

  const navItem = getNavItemByPath(path as string, siteNav);
  const fileFullName = `/${path}/${fileName}.md`;

  useEffect(() => {
    setCurrentPart(navItem);
    setShowPartNav(navItem.id > 0);
  }, [navItem]);

  if (navItem.id === 0) return <NotFound />;

  return (
    <div className={cls.ContentPage}>
      <DataProvider
        fileName={fileFullName}
        renderContent={(data) => <Post post={data as string} />}
      />
    </div>
  );
};

export default ContentPage;
