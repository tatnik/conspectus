import React, { ForwardedRef } from 'react';
import Markdown from 'markdown-to-jsx';
import { Link } from '@gravity-ui/uikit';

interface PostMarkdownBlockProps {
  post: string;
  blockRef: ForwardedRef<HTMLDivElement>;
  className?: string;
}

export const PostMarkdownBlock: React.FC<PostMarkdownBlockProps> = ({
  post,
  blockRef,
  className,
}) => (
  <div
    ref={blockRef}
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
