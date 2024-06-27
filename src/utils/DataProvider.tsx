import React, { useEffect, useState } from 'react';
import { getFile } from './utils';
import { NOT_FOUND } from 'src/app/App';

interface DataProviderProps {
  fileName: string;
  renderContent: React.FC;
}

export const DataProvider: React.FC<DataProviderProps> = (props) => {
  const { fileName, renderContent } = props;
  const [data, setData] = useState('');

  const getPost = async () => {
    const res = await getFile(fileName);
    setData(res.err === '' ? res.text : NOT_FOUND);
  };

  useEffect(() => {
    getPost();
  }, [fileName]);

  return <>{renderContent(data)}</>;
};
