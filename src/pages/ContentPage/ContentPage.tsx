import React, { SetStateAction, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShowMd } from 'src/components/ShowMd/ShowMd';

import cls from './ContentPage.module.scss';
import { TypeNavLink } from 'src/components/layout/Nav/Nav';
import { PAGE_TITLE } from 'src/app/App';
import { NotFound } from 'src/pages/NotFound/NotFound';
import { DataProvider } from 'src/utils/DataProvider';

export interface ContentPageProps {
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  navItem: TypeNavLink;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const ContentPage: React.FC<ContentPageProps> = (props) => {
  const { setPageTitle, navItem, setCurrentPart } = props;
  const { fileName } = useParams();
  const contentName = navItem.path + '/' + fileName + '.md';

  setPageTitle(`${PAGE_TITLE}  ${navItem.name} `);

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
