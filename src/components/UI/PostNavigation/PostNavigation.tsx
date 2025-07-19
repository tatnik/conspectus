import React, { useState } from 'react';
import { Text } from '@gravity-ui/uikit';
import cls from './PostNavigation.module.scss';

import { useActiveHeading } from 'src/hooks/useActiveHeading';
import { HeadingInfo } from 'src/types/heading';
import { NavItem } from 'src/components/UI/NavItem/NavItem';

interface PostNavigationProps {
  heads: HeadingInfo[];
  pageTitle: string;
  markdownBlockRef: React.RefObject<HTMLDivElement>;
}

/**
 * Компонент для боковой навигации по статье.
 * Показывает структуру заголовков (heads) и позволяет быстро переходить к нужному разделу.
 * Активный пункт подсвечивается по мере скролла или при клике.
 *
 * @param {Object} props - Свойства компонента
 * @param {HeadingInfo[]} props.heads - Список заголовков статьи (id, уровень, текст).
 * @param {string} props.pageTitle - Заголовок/название текущей страницы или статьи.
 * @param {React.RefObject<HTMLDivElement>} props.markdownBlockRef - Ref на основной блок статьи для отслеживания положения.
 *
 * @returns {JSX.Element|null} Навигация по заголовкам или null, если заголовков нет.
 */
export const PostNavigation = (props: PostNavigationProps) => {
  const { heads, pageTitle, markdownBlockRef } = props;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const activeIndex = useActiveHeading(heads, markdownBlockRef, selectedIndex, setSelectedIndex);

  if (!heads.some((h) => h.level > 1)) return null;

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
            <NavItem
              key={head.id}
              to={{ hash: `#${head.id}` }}
              active={index === activeIndex}
              style={{ paddingLeft: (head.level - 2) * 18 }}
              onClick={() => setSelectedIndex(index)}
            >
              {head.text}
            </NavItem>
          ) : null
        )}
      </ul>
    </nav>
  );
};
