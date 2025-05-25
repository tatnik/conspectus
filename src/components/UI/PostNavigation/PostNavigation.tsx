import React from 'react';

import { Link, Text } from '@gravity-ui/uikit';

import cls from './PostNavigation.module.scss';
import { apiGetH2Id } from 'src/data/Api';

interface TypePostNavigationProps {
  heads: Array<string>;
  pageTitle: string;
}

export const PostNavigation = (props: TypePostNavigationProps) => {
  const { heads, pageTitle } = props;
  return (
    <nav className={cls.PostNavigation}>
      <Text
        variant="subheader-1"
        color={'info'}
      >
        {pageTitle}
      </Text>
      <ul>
        {heads.map((text, index) => (
          <li key={index + 1}>
            <Link href={`#${apiGetH2Id(index)}`}>{text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
