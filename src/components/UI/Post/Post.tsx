import React, { useRef } from 'react';
import { Alert } from '@gravity-ui/uikit';

import 'highlight.js/scss/default.scss';
import cls from './Post.module.scss';

import { useHighlightAndHeadings } from 'src/hooks/useHighlightAndHeadings';
import { PostMarkdownBlock } from './PostMarkdownBlock';
import { PostNavigation } from 'src/components/UI/PostNavigation/PostNavigation';
import { NO_CONTENT } from 'src/constants';
import { TypeNavLink } from 'src/types/nav';
import { PrevNextButtons } from '../PrevNextButtons/PrevNextButtons';
import { Sidebar } from 'src/components/layout/Sidebar/Sidebar';
import { parseTitleFromMarkdown } from 'src/utils/parsers';
import { useScrollToHash } from 'src/hooks/useScrollToHash';

/**
 * Свойства для компонента Post.
 */
export interface TypePostProps {
  post: string;
  prevPost?: TypeNavLink;
  nextPost?: TypeNavLink;
}

/**
 * Компонент для отображения markdown-поста с подсветкой синтаксиса, боковой навигацией и кнопками "назад/вперёд".
 *
 * @param props - Объект со следующими свойствами:
 *   - post: содержимое поста в формате markdown
 *   - prevPost: объект для навигации на предыдущий пост
 *   - nextPost: объект для навигации на следующий пост
 *
 * @returns {JSX.Element} Разметка поста, навигации и кнопок перехода.
 */
export const Post: React.FC<TypePostProps> = ({ post, prevPost, nextPost }) => {
  const markdownBlockRef = useRef<HTMLDivElement>(null);

  useScrollToHash(post);

  // Используем кастомный хук для подсветки и сбора заголовков
  const heads = useHighlightAndHeadings(markdownBlockRef, [post]);

  if (!post) {
    return (
      <Alert
        theme="warning"
        message={NO_CONTENT}
        className={cls.PostAlert}
      />
    );
  }

  return (
    <article className={cls.PostGrid}>
      <PostMarkdownBlock
        post={post}
        markdownBlockRef={markdownBlockRef}
        className={cls.PostBlock}
      />
      <Sidebar>
        <PostNavigation
          heads={heads}
          pageTitle={parseTitleFromMarkdown(post)}
          markdownBlockRef={markdownBlockRef}
        />
        <PrevNextButtons
          prevPost={prevPost}
          nextPost={nextPost}
        />
      </Sidebar>
    </article>
  );
};
