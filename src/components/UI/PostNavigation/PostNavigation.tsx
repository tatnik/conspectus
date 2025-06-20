import React, { useState } from 'react';

import { Text, Link as GLink } from '@gravity-ui/uikit';

import cls from './PostNavigation.module.scss';

import { useActiveHeading } from 'src/hooks/useActiveHeading';
import { parseIdFromH2 } from 'src/data/parsers';

interface PostNavigationProps {
  heads: string[];
  pageTitle: string;
  postBlockRef: React.RefObject<HTMLDivElement>;
}

export const PostNavigation = (props: PostNavigationProps) => {
  const { heads, pageTitle, postBlockRef } = props;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const activeIndex = useActiveHeading(heads, postBlockRef, selectedIndex, setSelectedIndex);

  if (!heads.length) return null;

  return (
    <nav
      className={cls.PostNavigation}
      aria-label="Навигация по статье"
    >
      <Text
        variant="subheader-2"
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
            <GLink
              href={`#${parseIdFromH2(index)}`}
              onClick={() => setSelectedIndex(index)}
            >
              {text}
            </GLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
