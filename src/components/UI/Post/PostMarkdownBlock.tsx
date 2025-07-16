import React, { ForwardedRef } from 'react';
import Markdown from 'markdown-to-jsx';
import { Link } from '@gravity-ui/uikit';

interface PostMarkdownBlockProps {
  post: string;
  markdownBlockRef: ForwardedRef<HTMLDivElement>;
  className?: string;
}

/**
 * Блок разметки markdown для статьи/поста.
 *
 * Рендерит содержимое markdown с поддержкой ссылок Gravity UI.
 * Внешний div можно кастомизировать через ref и className (например, для подсветки синтаксиса, якорей или скроллинга).
 *
 * @param {Object} props - Свойства компонента PostMarkdownBlock
 * @param {string} props.post - Текст поста/статьи в формате markdown.
 * @param {React.ForwardedRef<HTMLDivElement>} props.markdownBlockRef - Ref для внешнего блока (например, для скролла/подсветки).
 * @param {string} [props.className] - Дополнительные CSS-классы для внешнего блока.
 *
 * @returns {JSX.Element} Отформатированный markdown-блок, где все ссылки автоматически заменены на компонент Link Gravity UI.
 */
export const PostMarkdownBlock: React.FC<PostMarkdownBlockProps> = ({
  post,
  markdownBlockRef,
  className,
}) => (
  <div
    ref={markdownBlockRef}
    className={className}
  >
    <Markdown
      options={{
        overrides: {
          a: {
            component: Link,
            props: {
              view: 'normal',
              target: '_blank',
            },
          },
        },
      }}
    >
      {post}
    </Markdown>
  </div>
);
