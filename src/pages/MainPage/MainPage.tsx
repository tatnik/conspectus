import React, { SetStateAction, useLayoutEffect } from 'react';
import { ShowMd } from 'src/components/ShowMd/ShowMd';

import cls from './MainPage.module.scss';
import { TypeNavLink } from './../../components/layout/Nav/Nav';
import { PAGE_TITLE } from 'src/app/App';
import { DataProvider } from 'src/utils/DataProvider';

export interface MainPageProps {
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  setCurrentPart: React.Dispatch<SetStateAction<TypeNavLink>>;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
  const { setPageTitle, setCurrentPart } = props;
  setPageTitle(PAGE_TITLE.toUpperCase());
  const fileName = '/readme.md';

  useLayoutEffect(() => {
    setCurrentPart({ id: 0, name: '', path: '' });
  }, []);

  return (
    <main className={cls.MainPage}>
      <DataProvider
        fileName={fileName}
        renderContent={(data) => (
          <ShowMd
            post={data as string}
            isIndex={true}
          />
        )}
      />
    </main>
  );
};
