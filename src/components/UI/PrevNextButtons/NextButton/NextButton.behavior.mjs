export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    postPath: '/next-post',
    postName: 'Следующий пост',
    className: 'next-button-class',
  },
  tests: [
    {
      it: 'отображает название следующего поста и кнопку',
      async: false,
      steps: `
        expect(screen.getByText('Следующий пост')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
      `,
    },
    {
      it: 'ссылка ведёт на правильный путь',
      async: false,
      steps: `
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/next-post');
      `,
    },
  ],
};
