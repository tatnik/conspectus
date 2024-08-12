import 'highlight.js/scss/default.scss';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript'; // import JS highlighting
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import Markdown from 'markdown-to-jsx';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { Link } from '@gravity-ui/uikit';

import cls from './ShowMd.module.scss';
import { getTitleFromPost } from 'src/utils/utils';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import MdNavigation from '../MdNavigation/MdNavigation';

hljs.registerLanguage('javascript', javascript); // import XML highlighting
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);

export interface ShowMdProps {
  post: string;
}

interface Heading {
  text: string;
  id: string;
}

// eslint-disable-next-line no-implicit-globals
function generateHeadingsArray(article: HTMLElement | null): Heading[] {
  if (article === null) return [];

  const h2Tags = article.getElementsByTagName('h2');
  const headings: Heading[] = [];
  for (let i = 0; i < h2Tags.length; i++) {
    const h2Tag = h2Tags[i];
    const text = h2Tag.textContent || '';
    const newId = `h2-${i + 1}`;
    h2Tag.id = newId;
    headings.push({ text, id: newId });
  }
  return headings;
}

export const ShowMd = (props: ShowMdProps) => {
  const { post } = props;
  const articleRef = useRef(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const { setPageTitle } = useAppContext();

  useLayoutEffect(() => {
    const element: HTMLElement | null = articleRef.current;
    if (element) {
      const arrayH2 = generateHeadingsArray(element);
      setHeadings(arrayH2);
      setPageTitle(getTitleFromPost(post));
      hljs.highlightAll();
    }
  }, [post, articleRef]);

  return (
    <article
      ref={articleRef}
      className={cls.showMdGrid}
    >
      <Markdown
        className={cls.showMdBlock}
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
      <MdNavigation headings={headings} />
    </article>
  );
};
