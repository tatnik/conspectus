import React, { useState } from 'react';

import { Text, Link as GLink } from '@gravity-ui/uikit';

import cls from './PostNavigation.module.scss';

import { useActiveHeading } from 'src/hooks/useActiveHeading';
import { HeadingInfo } from 'src/types/heading';

interface PostNavigationProps {
  heads: HeadingInfo[];
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
        {heads.map((head, index) =>
          head.level > 1 ? (
            <li
              key={head.id}
              className={index === activeIndex ? cls.active : ''}
              style={{ paddingLeft: (head.level - 2) * 18 }}
            >
              <GLink
                href={`#${head.id}`}
                onClick={() => setSelectedIndex(index)}
              >
                {head.text}
              </GLink>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  );
};
