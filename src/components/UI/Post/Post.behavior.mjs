export default {
  // Дополнительные импорты для теста
  imports: [
    `import { screen } from '@testing-library/react';
     import { NO_CONTENT } from 'src/constants';
    `,
  ],

  // Кастомные пропсы для тестов
  props: {
    post: '# Заголовок поста ',
    prevPost: { id: 1, name: 'Назад', path: '/prev' },
    nextPost: { id: 2, name: 'Вперёд', path: '/next' },
  },

  // Тесты для компонента
  tests: [
    {
      it: 'компонент рендерится',
      async: false,
    },
    {
      it: 'отображает предупреждение, если пост пустой',
      async: false,
      steps: `
        expect(screen.getByText(NO_CONTENT)).toBeInTheDocument();
      `,
      props: {
        post: '',
      },
    },
    {
      it: 'отображает разметку markdown поста',
      async: false,
      steps: `
        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.queryAllByText('Заголовок поста').length).toEqual(1);
      `,
    },
    {
      it: 'рендерит кнопки навигации для предыдущего и следующего поста',
      async: false,
      steps: `
        expect(screen.getByText('Назад')).toBeInTheDocument();
        expect(screen.getByText('Вперёд')).toBeInTheDocument();
      `,
    },
  ],
};
