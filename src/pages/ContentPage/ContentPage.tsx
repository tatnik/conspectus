import React, { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShowMd } from 'src/components/ShowMd/ShowMd';

import cls from './ContentPage.module.scss';
import { TypeNavLink } from 'src/components/layout/Nav/Nav';

import { NotFound } from 'src/pages/NotFound/NotFound';
import { DataProvider } from 'src/utils/DataProvider';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

export interface ContentPageProps {
  navItem: TypeNavLink;
}

export const ContentPage: React.FC<ContentPageProps> = (props) => {
  const { navItem } = props;
  const { setCurrentPart } = useAppContext();
  const { fileName } = useParams();
  const contentName = navItem.path + '/' + fileName + '.md';

  useLayoutEffect(() => {
    setCurrentPart(navItem);
  }, [navItem]);

  return navItem.id === 0 ? (
    <NotFound />
  ) : (
    <main className={cls.ContentPage}>
      <DataProvider
        fileName={contentName}
        renderContent={(data) => (
          <ShowMd
            post={data as string}
            isIndex={false}
          />
        )}
      />
    </main>
  );
};
