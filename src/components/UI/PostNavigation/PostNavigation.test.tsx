import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';
import * as useActiveHeadingModule from 'src/hooks/useActiveHeading';

jest.mock('src/hooks/useActiveHeading');

import { PostNavigation } from './PostNavigation';

describe('<PostNavigation />', () => {
  beforeEach(() => {
    // Для всех тестов: активный пункт — второй
    (useActiveHeadingModule.useActiveHeading as jest.Mock).mockReturnValue(1);
  });

  it('рендерится без ошибок', () => {
    renderWithProviders(
      <PostNavigation
        heads={[
          { id: 'head1', level: 2, text: 'Введение' },
          { id: 'head2', level: 2, text: 'Основы' },
          { id: 'head3', level: 3, text: 'Детали' },
        ]}
        pageTitle="Тестовая статья"
        markdownBlockRef={{ current: null }}
      />
    );
  });

  it('отображает навигацию по заголовкам', () => {
    renderWithProviders(
      <PostNavigation
        heads={[
          { id: 'head1', level: 2, text: 'Введение' },
          { id: 'head2', level: 2, text: 'Основы' },
          { id: 'head3', level: 3, text: 'Детали' },
        ]}
        pageTitle="Тестовая статья"
        markdownBlockRef={{ current: null }}
      />
    );
    // Есть элемент <nav> и список
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Тестовая статья')).toBeInTheDocument();

    // Есть ссылки по id заголовков
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
    expect(items[0]).toHaveTextContent('Введение');
    expect(items[1]).toHaveTextContent('Основы');
    expect(items[2]).toHaveTextContent('Детали');
  });
  it('не отображает навигацию если heads пустой', () => {
    renderWithProviders(
      <PostNavigation
        heads={[]}
        pageTitle="Тестовая статья"
        markdownBlockRef={{ current: null }}
      />
    );
    // Навигация отсутствует
    expect(screen.queryByRole('navigation')).toBeNull();
  });
  it('отмечает второй пункт как активный', () => {
    renderWithProviders(
      <PostNavigation
        heads={[
          { id: 'head1', level: 2, text: 'Введение' },
          { id: 'head2', level: 2, text: 'Основы' },
          { id: 'head3', level: 3, text: 'Детали' },
        ]}
        pageTitle="Тестовая статья"
        markdownBlockRef={{ current: null }}
      />
    );
    const items = screen.getAllByRole('listitem');
    // Проверяем, что у второго есть признак активности
    expect(items[1]).toHaveAttribute('data-active', 'true');
  });
  it('не отображает если все heads имеют level 1', () => {
    renderWithProviders(
      <PostNavigation
        heads={[{ id: 'main', level: 1, text: 'Заголовок h1' }]}
        pageTitle="Тестовая статья"
        markdownBlockRef={{ current: null }}
      />
    );
    expect(screen.queryByRole('navigation')).toBeNull();
  });
});
