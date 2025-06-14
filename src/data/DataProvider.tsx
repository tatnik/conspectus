import React, { useEffect, useState } from 'react';
import { apiGetFile } from './Api';
import { NOT_FOUND } from 'src/constants';
import { Loader } from '@gravity-ui/uikit';

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

    apiGetFile(fileName)
      .then((res) => {
        if (!isMounted) return;
        if (res.err === '') {
          setData(res.text);
        } else {
          setError(res.err || NOT_FOUND);
        }
      })
      .catch((e) => {
        if (isMounted) setError(String(e));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

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
    return <div style={{ color: 'red', textAlign: 'center', padding: 24 }}>{error}</div>;
  }

  return <>{renderContent(data)}</>;
};
