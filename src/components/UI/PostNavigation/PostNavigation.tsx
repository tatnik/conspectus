import React, { useState } from 'react';

import { Link, Text } from '@gravity-ui/uikit';

import cls from './PostNavigation.module.scss';
import { apiGetH2Id } from 'src/data/Api';
import { useActiveHeading } from 'src/hooks/useActiveHeading';

interface PostNavigationProps {
  heads: string[];
  pageTitle: string;
  postBlockRef: React.RefObject<HTMLDivElement>;
}

export const PostNavigation = (props: PostNavigationProps) => {
  const { heads, pageTitle, postBlockRef } = props;
  if (!heads.length) return null;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const activeIndex = useActiveHeading(heads, postBlockRef, selectedIndex, setSelectedIndex);

  return (
    <nav
      className={cls.PostNavigation}
      aria-label="Навигация по статье"
    >
      <Text
        variant="subheader-1"
        color={'info'}
      >
        {pageTitle}
      </Text>
      <ul>
        {heads.map((text, index) => (
          <li
            key={index + 1}
            className={index === activeIndex ? cls.active : ''}
          >
            <Link
              href={`#${apiGetH2Id(index)}`}
              onClick={() => setSelectedIndex(index)}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
