import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

export interface CurrentPartTitleProps {
  /** Главная страница? — тогда не показываем */
  isMainPage: boolean;
  /** Страница-индекс текущего раздела? — тогда только название, без ссылки */
  isPartIndexPage: boolean;
}

/**
 * Заголовок или ссылка на индексную страницу текущего раздела (Part).
 * На главной не отображается. Если находимся на странице раздела — только название.
 * В остальных случаях — ссылка на индексную страницу раздела.
 *
 * @component
 * @param {CurrentPartTitleProps} props
 * @returns {JSX.Element|null} Название или ссылка на раздел, либо null на главной.
 */
export const CurrentPartTitle: React.FC<CurrentPartTitleProps> = ({
  isMainPage,
  isPartIndexPage,
}) => {
  const { currentPart } = useAppContext();

  if (isMainPage) return null;

  if (isPartIndexPage) {
    return (
      <Text
        variant="header-1"
        color="info"
      >
        {currentPart.name}
      </Text>
    );
  }
  return (
    <Link to={currentPart.path}>
      <Text
        variant="header-1"
        color="info"
      >
        {currentPart.name}
      </Text>
    </Link>
  );
};
