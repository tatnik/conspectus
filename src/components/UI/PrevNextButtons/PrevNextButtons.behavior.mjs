export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    prevPost: { id: 1, name: 'Предыдущий пост', path: '/prev-post' },
    nextPost: { id: 2, name: 'Следующий пост', path: '/next-post' },
  },
  tests: [
    {
      it: 'отображает обе кнопки если есть prevPost и nextPost',
      async: false,
      steps: `
        expect(screen.getByText('Предыдущий пост')).toBeInTheDocument();
        expect(screen.getByText('Следующий пост')).toBeInTheDocument();
      `,
    },
    {
      it: 'не отображает кнопку предыдущего поста если prevPost не задан',
      async: false,
      props: {
        prevPost: undefined,
      },
      steps: `
        expect(screen.queryByText('Предыдущий пост')).toBeNull();
        expect(screen.getByText('Следующий пост')).toBeInTheDocument();
      `,
    },
    {
      it: 'не отображает кнопку следующего поста если nextPost не задан',
      async: false,
      props: {
        nextPost: undefined,
      },
      steps: `
        expect(screen.queryByText('Следующий пост')).toBeNull();
        expect(screen.getByText('Предыдущий пост')).toBeInTheDocument();
      `,
    },
  ],
};
