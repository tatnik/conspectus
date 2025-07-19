export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    post: '# Заголовок\nТекст [ссылка](https://example.com)',
    markdownBlockRef: { current: null },
    className: 'custom-markdown-block',
  },
  tests: [
    {
      it: 'корректно рендерит markdown-текст с заголовком и ссылкой',
      async: false,
      steps: `
        // Проверяет наличие заголовка h1
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Заголовок');
        // Проверяет наличие ссылки и правильный href
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveTextContent('ссылка');
      `,
    },
    {
      it: 'применяет переданный className для блока',
      async: false,
      steps: `
        // Блок с className должен быть в DOM
        expect(document.querySelector('.custom-markdown-block')).toBeInTheDocument();
      `,
    },
    {
      it: 'работает с пустым постом',
      async: false,
      props: {
        post: '',
        markdownBlockRef: { current: null },
        className: 'empty-block',
      },
      steps: `
        // Должен быть div-блок, но внутри ничего нет
        const block = document.querySelector('.empty-block');
        expect(block).toBeInTheDocument();
        expect(block).toHaveTextContent('');
      `,
    },
  ],
};
