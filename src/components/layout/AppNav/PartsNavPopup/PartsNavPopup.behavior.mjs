export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    isMainPage: false,
  },
  tests: [
    {
      it: 'рендерит попап для навигации по разделам, если не главная страница',
      async: false,
      steps: `
        // Должна быть кнопка или popup для перехода по разделам
        expect(screen.getByRole('button')).toBeInTheDocument();
      `,
    },
    {
      it: 'не рендерится на главной странице',
      async: false,
      props: {
        isMainPage: true,
      },
      steps: `
        // Должен вернуть null — ни одного popup или button
        expect(screen.queryByRole('button')).toBeNull();
      `,
    },
  ],
};
