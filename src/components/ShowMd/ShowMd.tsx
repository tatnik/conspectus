import 'highlight.js/scss/default.scss';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript'; // import JS highlighting
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import Markdown from 'markdown-to-jsx';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { Link } from '@gravity-ui/uikit';

import MdNavigation from '../MdNavigation/MdNavigation';
import cls from './ShowMd.module.scss';

hljs.registerLanguage('javascript', javascript); // import XML highlighting
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);

export interface ShowMdProps {
  post: string;
  isIndex: boolean;
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
  const { post, isIndex } = props;
  const articleRef = useRef(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const mdProps = isIndex
    ? {
        view: 'normal',
      }
    : {
        view: 'normal',
        target: '_blank',
      };

  useLayoutEffect(() => {
    const element: HTMLElement | null = articleRef.current;
    if (element) {
      if (!isIndex) {
        const arrayH2 = generateHeadingsArray(element);
        setHeadings(arrayH2);
      }
      hljs.highlightAll();
    }
  }, [post, articleRef, isIndex]);

  return (
    <article
      ref={articleRef}
      className={isIndex ? cls.showMdBlock : cls.showMdGrid}
    >
      <div className={cls.showMdBlock}>
        <Markdown
          options={{
            overrides: {
              wrapper: React.Fragment,
              a: {
                component: Link,
                props: mdProps,
              },
            },
          }}
        >
          {post}
        </Markdown>
      </div>
      {isIndex ? null : <MdNavigation headings={headings} />}
    </article>
  );
};
