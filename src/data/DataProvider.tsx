import React, { useEffect, useState } from 'react';
import { getFile } from './api';

import { Loader } from '@gravity-ui/uikit';
import NotFound from 'src/pages/NotFound/NotFound';

interface TypeDataProviderProps {
  fileName: string;
  renderContent: (data: string) => React.ReactNode;
}

export const DataProvider = (props: TypeDataProviderProps) => {
  const { fileName, renderContent } = props;
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const text = await getFile(fileName);
        if (isMounted) setData(text);
      } catch (e) {
        if (isMounted) setError(String(e));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fileName]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 24 }}>
        <Loader size="l" />
      </div>
    );
  }

  if (error) {
    // если не прод, передаем текст ошибки
    const isDev = process.env.NODE_ENV !== 'production';
    return <NotFound errorMessage={isDev ? error : undefined} />;
  }

  return <>{renderContent(data)}</>;
};
