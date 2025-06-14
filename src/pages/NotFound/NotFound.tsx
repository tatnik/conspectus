// Не убирать default экспорт! Используется для ленивого импорта, именованный нужен для автогенерации тестов
import React from 'react';
import { NOT_FOUND } from 'src/constants';

export const NotFound = () => {
  return <p>{NOT_FOUND}</p>;
};

export default NotFound;
