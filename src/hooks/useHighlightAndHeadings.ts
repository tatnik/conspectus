import { useLayoutEffect, useState } from 'react';
import hljs from 'src/utils/highlight';
import { parseHeadingsFromHtml } from 'src/utils/parsers';
import { HeadingInfo } from 'src/types/heading';

/**
 * Хук для подсветки кода и парсинга заголовков из markdown-блока.
 * @param ref - ref на DOM-элемент с контентом markdown.
 * @param deps - зависимости для эффекта (обычно post).
 * @returns Массив объектов заголовков (HeadingInfo[])
 */
export function useHighlightAndHeadings(
  ref: React.RefObject<HTMLElement>,
  deps: React.DependencyList = []
): HeadingInfo[] {
  const [heads, setHeads] = useState<HeadingInfo[]>([]);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const postElement = ref.current;
    if (postElement) {
      const codeBlocks = postElement.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        if (!block.hasAttribute('data-highlighted')) {
          hljs.highlightElement(block as HTMLElement);
        }
      });
      setHeads(parseHeadingsFromHtml(postElement));
    }
    // eslint-disable-next-line
  }, deps);

  return heads;
}
