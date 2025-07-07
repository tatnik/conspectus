// Не убирать default экспорт! Используется для ленивого импорта, именованный нужен для автогенерации тестов

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { DataProvider } from 'src/data/DataProvider';

import { Post } from 'src/components/UI/Post/Post';
import { NotFound } from 'src/pages/NotFound/NotFound';

import cls from './ContentPage.module.scss';
import { getNavItemById, getNavItemByPath } from 'src/utils/helpers';

export const ContentPage = () => {
  const { path = '', fileName = '' } = useParams<{ path?: string; fileName?: string }>();
  const { setCurrentPart, setShowPartNav, siteNav, partNavArray } = useAppContext();

  const part = getNavItemByPath(path, siteNav);

  const fileFullName = `/${path}/${fileName}.md`;

  useEffect(() => {
    setCurrentPart(part);
    setShowPartNav(part.id > 0);
  }, [part]);

  const partNav = useMemo(() => partNavArray[part?.id] || [], [partNavArray, part?.id]);

  if (part.id === 0) return <NotFound />;

  const postItem = getNavItemByPath(`/${path}/${fileName}`, partNav);
  const prevPostItem = getNavItemById(postItem.id - 1, partNav);
  const nextPostItem = getNavItemById(postItem.id + 1, partNav);

  return (
    <div className={cls.ContentPage}>
      <DataProvider
        fileName={fileFullName}
        renderContent={(data) => (
          <Post
            post={data}
            prevPost={prevPostItem}
            nextPost={nextPostItem}
          />
        )}
      />
    </div>
  );
};

export default ContentPage;
