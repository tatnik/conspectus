import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import { PostMarkdownBlock } from './PostMarkdownBlock';

describe('<PostMarkdownBlock />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(
      <PostMarkdownBlock
        post="# Заголовок
Текст [ссылка](https://example.com)"
        markdownBlockRef={{ current: null }}
        className="custom-markdown-block"
      />
    );
  });

  it('корректно рендерит markdown-текст с заголовком и ссылкой', () => {
    renderWithProviders(
      <PostMarkdownBlock
        post="# Заголовок
    Текст [ссылка](https://example.com)"
        markdownBlockRef={{ current: null }}
        className="custom-markdown-block"
      />
    );
    // Проверяет наличие заголовка h1
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Заголовок');
    // Проверяет наличие ссылки и правильный href
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveTextContent('ссылка');
  });
  it('применяет переданный className для блока', () => {
    renderWithProviders(
      <PostMarkdownBlock
        post="# Заголовок
    Текст [ссылка](https://example.com)"
        markdownBlockRef={{ current: null }}
        className="custom-markdown-block"
      />
    );
    // Блок с className должен быть в DOM
    expect(document.querySelector('.custom-markdown-block')).toBeInTheDocument();
  });
  it('работает с пустым постом', () => {
    renderWithProviders(
      <PostMarkdownBlock
        post=""
        markdownBlockRef={{ current: null }}
        className="empty-block"
      />
    );
    // Должен быть div-блок, но внутри ничего нет
    const block = document.querySelector('.empty-block');
    expect(block).toBeInTheDocument();
    expect(block).toHaveTextContent('');
  });
});
