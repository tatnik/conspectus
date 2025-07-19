export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    postPath: '/prev-post',
    postName: 'Предыдущий пост',
    className: 'prev-button-class',
  },
  tests: [
    {
      it: 'отображает название предыдущего поста и кнопку',
      async: false,
      steps: `
        // Проверяет, что текст предыдущего поста отображается
        expect(screen.getByText('Предыдущий пост')).toBeInTheDocument();
        // Кнопка "влево" есть
        expect(screen.getByRole('button')).toBeInTheDocument();
      `,
    },
    {
      it: 'ссылка ведёт на правильный путь',
      async: false,
      steps: `
        // Проверяет правильный href у ссылки
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/prev-post');
      `,
    },
  ],
};
