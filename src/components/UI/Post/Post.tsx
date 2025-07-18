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

import { parseHeadingsFromHtml, parseTitleFromMarkdown } from 'src/utils/parsers';
import { PostNavigation } from 'src/components/UI/PostNavigation/PostNavigation';
import { NO_CONTENT } from 'src/constants';

import { TypeNavLink } from 'src/types/nav';
import { PrevNextButtons } from '../PrevNextButtons/PrevNextButtons';
import { Sidebar } from 'src/components/layout/Sidebar/Sidebar';
import { HeadingInfo } from 'src/types/heading';
import { useScrollToHash } from 'src/hooks/useScrollToHash';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('python', python);

export interface TypePostProps {
  post: string;
  prevPost: TypeNavLink;
  nextPost: TypeNavLink;
}

export const Post = (props: TypePostProps) => {
  const { post, prevPost, nextPost } = props;
  const postRef = useRef<HTMLDivElement | null>(null);
  const [heads, setHeads] = useState<HeadingInfo[]>([]);

  useLayoutEffect(() => {
    const postElement: HTMLElement | null = postRef.current;
    if (postElement) {
      const codeBlocks = postElement.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
      setHeads(parseHeadingsFromHtml(postElement));
    }
  }, [post, postRef]);

  const postBlockRef = useRef<HTMLDivElement>(null);

  useScrollToHash(post);

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
      <div
        ref={postBlockRef}
        className={cls.PostBlock}
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
      <Sidebar>
        <PostNavigation
          heads={heads}
          pageTitle={parseTitleFromMarkdown(post)}
          postBlockRef={postBlockRef}
        />
        <PrevNextButtons
          prevPost={prevPost}
          nextPost={nextPost}
        />
      </Sidebar>
    </article>
  );
};
