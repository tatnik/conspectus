import React, { useEffect, useState } from 'react';
import { apiGetFile } from './Api';
import { NOT_FOUND } from 'src/app/App';

interface TypeDataProviderProps {
  fileName: string;
  renderContent: React.FC;
}

export const DataProvider = (props: TypeDataProviderProps) => {
  const { fileName, renderContent } = props;
  const [data, setData] = useState('');

  const getPost = async () => {
    const res = await apiGetFile(fileName);
    setData(res.err === '' ? res.text : NOT_FOUND);
  };

  useEffect(() => {
    getPost();
  }, [fileName]);

  return <>{renderContent(data)}</>;
};
