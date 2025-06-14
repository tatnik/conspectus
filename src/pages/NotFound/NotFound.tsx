// Не убирать default экспорт! Используется для ленивого импорта, именованный нужен для автогенерации тестов
import React from 'react';
import { Alert, Text, Card, Link } from '@gravity-ui/uikit';
import { NOT_FOUND } from 'src/constants';
import cls from './NotFound.module.scss';

interface NotFoundProps {
  errorMessage?: string;
}

export const NotFound = (props: NotFoundProps) => {
  const { errorMessage } = props;
  const message = errorMessage || NOT_FOUND;

  return (
    <div className={cls.NotFound}>
      <Card
        view="outlined"
        className={cls.NotFoundCard}
        theme="warning"
      >
        <Alert
          theme="warning"
          title="Ошибка 404"
          message={message}
          className={cls.NotFoundAlert}
        />
        <Text
          variant="subheader-2"
          color="secondary"
        >
          Попробуйте выбрать раздел из меню или вернуться на <Link href="/conspectus">главную</Link>
          .
        </Text>
      </Card>
    </div>
  );
};

export default NotFound;
