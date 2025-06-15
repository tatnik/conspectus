import React from 'react';
import { Link } from 'react-router-dom';

import { Text } from '@gravity-ui/uikit';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

export interface CurrentPartLinkProps {
  isMainPage: boolean;
  isPartIndexPage: boolean;
}

// название/ссылка для индексной страницы текущего раздела
export const CurrentPartLink = (props: CurrentPartLinkProps) => {
  const { isMainPage, isPartIndexPage } = props;
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
