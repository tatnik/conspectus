export default {
  imports: [
    `import { screen } from '@testing-library/react';`,
    `import * as useActiveHeadingModule from 'src/hooks/useActiveHeading';`,
  ],
  header: [`jest.mock('src/hooks/useActiveHeading');`],
  describe_header: [
    `
    beforeEach(() => {
      // Для всех тестов: активный пункт — второй
      (useActiveHeadingModule.useActiveHeading as jest.Mock).mockReturnValue(1);
    });
    `,
  ],
  props: {
    heads: [
      { id: 'head1', level: 2, text: 'Введение' },
      { id: 'head2', level: 2, text: 'Основы' },
      { id: 'head3', level: 3, text: 'Детали' },
    ],
    pageTitle: 'Тестовая статья',
    markdownBlockRef: { current: null },
  },
  tests: [
    {
      it: 'отображает навигацию по заголовкам',
      async: false,
      steps: `
        // Есть элемент <nav> и список
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByText('Тестовая статья')).toBeInTheDocument();

        // Есть ссылки по id заголовков
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBe(3);
        expect(items[0]).toHaveTextContent('Введение');
        expect(items[1]).toHaveTextContent('Основы');
        expect(items[2]).toHaveTextContent('Детали');
      `,
    },
    {
      it: 'не отображает навигацию если heads пустой',
      async: false,
      props: {
        heads: [],
        pageTitle: 'Тестовая статья',
        markdownBlockRef: { current: null },
      },
      steps: `
        // Навигация отсутствует
        expect(screen.queryByRole('navigation')).toBeNull();
      `,
    },
    {
      it: 'отмечает второй пункт как активный',
      async: false,
      steps: `
        const items = screen.getAllByRole('listitem');
        // Проверяем, что у второго есть признак активности
        expect(items[1]).toHaveAttribute('data-active', 'true');
      `,
    },
    // edge case: если есть только h1 — ничего не отображается
    {
      it: 'не отображает если все heads имеют level 1',
      async: false,
      props: {
        heads: [{ id: 'main', level: 1, text: 'Заголовок h1' }],
        pageTitle: 'Тестовая статья',
        markdownBlockRef: { current: null },
      },
      steps: `
        expect(screen.queryByRole('navigation')).toBeNull();
      `,
    },
  ],
};
