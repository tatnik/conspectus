import React, { useState, useEffect, useMemo } from 'react';
import { TextInput as Input, Text } from '@gravity-ui/uikit';
import { TypeNavLink } from 'src/types/nav';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';
import cls from './Search.module.scss';

type SearchItem = {
  link: string;
  text: string;
  level: number;
  breadcrumbs: string;
};

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка индекса
  useEffect(() => {
    let isMounted = true;
    fetch('/conspectus/search-index.json')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки индекса поиска');
        return res.json();
      })
      .then((data) => {
        if (isMounted) setIndex(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Ошибка');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Результаты поиска (id — number)
  const searchResults: TypeNavLink[] = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.trim().toLowerCase();
    return index
      .filter((item) => item.text.toLowerCase().includes(lower))
      .map((item, i) => ({
        id: i,
        name: item.breadcrumbs,
        path: item.link,
      }));
  }, [query, index]);

  const hasResults = searchResults.length > 0;

  return (
    <div className={cls.Search}>
      <Input
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        size="m"
        hasClear
        label="Поиск:"
        autoFocus
      />

      {loading && <Text>Загрузка...</Text>}
      {error && <Text className={cls.Error}>{error}</Text>}

      {/* Показываем NavPopup только если есть результаты */}
      {hasResults && (
        <NavPopup
          navLinks={searchResults}
          placement="bottom-end"
          strictHash={true}
          handleOnClick={() => {}} // обязателен по prop-types, но логика перехода внутри NavPopup
        />
      )}

      {/* Сообщение о пустом результате поиска */}
      {!loading && !error && query && !hasResults && <Text>Не&nbsp;найдено</Text>}
    </div>
  );
};

export default Search;
