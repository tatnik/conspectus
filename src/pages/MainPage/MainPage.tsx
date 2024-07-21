import React, { useLayoutEffect } from 'react';
import { ShowMd } from 'src/components/ShowMd/ShowMd';

import cls from './MainPage.module.scss';

import { DataProvider } from 'src/utils/DataProvider';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

export const MainPage: React.FC = () => {
  const { setCurrentPart, setPageTitle } = useAppContext();
  const fileName = '/readme.md';

  useLayoutEffect(() => {
    setCurrentPart({ id: 0, name: '', path: '' });
    setPageTitle('');
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
