// Не убирать default экспорт! Используется для ленивого импорта, именованный нужен для автогенерации тестов

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { DataProvider } from 'src/data/DataProvider';

import { NavList } from 'src/components/UI/NavList/NavList';
import { Card, Link as LinkGravity } from '@gravity-ui/uikit';
import { NotFound } from 'src/pages/NotFound/NotFound';

import cls from './IndexPage.module.scss';
import { getImgName, getIndexFileName, getNavItemByPath } from 'src/utils/helpers';
import { parseNavFromIndex } from 'src/utils/parsers';

/**
 * Главная страница сайта/раздела — отображает навигацию по разделам/конспектам.
 */
export const IndexPage = () => {
  const { setCurrentPart, setShowPartNav, siteNav } = useAppContext();
  const { path } = useParams();

  const partPath = path ?? '';

  const newCurrentPart = useMemo(() => getNavItemByPath(partPath, siteNav), [partPath, siteNav]);

  const fileName = getIndexFileName(newCurrentPart);

  useEffect(() => {
    setCurrentPart(newCurrentPart);
    setShowPartNav(false);
  }, [newCurrentPart]);

  const showNotFound = newCurrentPart.id === 0 && !!path;
  if (showNotFound) return <NotFound />;

  /**
   * Рендерит список навигации на основе содержимого индексного файла.
   * @param data markdown из index.md
   */
  const renderNavList = (data: string): JSX.Element => (
    <NavList
      navLinkArray={parseNavFromIndex(data)}
      classNameList={cls.nav}
      classNameItem={cls.navItem}
      renderProps={(val) => (
        <Card className={cls.card}>
          <img
            src={getImgName(val.path)}
            loading="lazy"
            alt={val.name}
          />
          <LinkGravity>{val.name}</LinkGravity>
        </Card>
      )}
    />
  );

  return (
    <div className={cls.IndexPage}>
      <DataProvider
        fileName={fileName}
        renderContent={renderNavList}
      />
    </div>
  );
};

export default IndexPage;
