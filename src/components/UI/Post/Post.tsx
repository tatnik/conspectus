import 'highlight.js/scss/default.scss';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml';
import Markdown from 'markdown-to-jsx';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { Link, Alert } from '@gravity-ui/uikit';

import cls from './Post.module.scss';
import { apiGetHeadsArray, apiGetTitleFromPost } from 'src/data/Api';
import { PostNavigation } from 'src/components/UI/PostNavigation/PostNavigation';
import { NO_CONTENT } from 'src/constants';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('python', python);

export interface TypePostProps {
  post: string;
}

export const Post = (props: TypePostProps) => {
  const { post } = props;
  const postRef = useRef<HTMLDivElement | null>(null);
  const [heads, setHeads] = useState<Array<string>>([]);

  useLayoutEffect(() => {
    const postElement: HTMLElement | null = postRef.current;
    if (postElement) {
      const codeBlocks = postElement.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
      setHeads(apiGetHeadsArray(postElement));
    }
  }, [post, postRef]);

  if (!post)
    return (
      <Alert
        theme="warning"
        message={NO_CONTENT}
        className={cls.PostAlert}
      />
    );

  return (
    <article
      ref={postRef}
      className={cls.PostGrid}
    >
      <Markdown
        className={cls.PostBlock}
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
      <PostNavigation
        heads={heads}
        pageTitle={apiGetTitleFromPost(post)}
      />
    </article>
  );
};
