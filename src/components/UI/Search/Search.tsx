import React, { useState, useEffect, useMemo } from 'react';
import { TextInput as Input, Text, Button } from '@gravity-ui/uikit';
import { TypeNavLink } from 'src/types/nav';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';
import cls from './Search.module.scss';

type SearchItem = {
  link: string; // путь вида ts/ts_oop#id
  text: string; // заголовок
  level: number; // уровень #, ##, ...
  breadcrumbs: string;
};

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchList, setSearchList] = useState<TypeNavLink[]>([]);

  // Загрузка индекса при монтировании
  useEffect(() => {
    fetch('/conspectus/search-index.json')
      .then((res) => res.json())
      .then((data) => setIndex(data))
      .finally(() => setLoading(false));
  }, []);

  // Массив результатов поиска
  const results: TypeNavLink[] = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    const filterIndex = index.filter((item) => item.text.toLowerCase().includes(lower));
    return filterIndex.map((item, id) => {
      return {
        id,
        name: item.breadcrumbs,
        path: item.link,
      };
    });
  }, [query, index]);

  let resultContent: React.ReactNode;
  if (loading) {
    resultContent = <Text>Загрузка...</Text>;
  } else if (results.length === 0) {
    resultContent = query ? <Text>не&nbsp;найдено</Text> : null;
  } else {
    resultContent = (
      <NavPopup
        navLinks={searchList}
        handleOnClick={() => {}}
        placement="bottom-end"
      ></NavPopup>
    );
  }

  return (
    <div className={cls.Search}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="m"
        hasClear={true}
        label={'Поиск:'}
        autoFocus
      />
      <Button
        aria-haspopup="menu"
        onClick={() => setSearchList(results)}
      >
        &#8981;
      </Button>
      {resultContent}
    </div>
  );
};

export default Search;
