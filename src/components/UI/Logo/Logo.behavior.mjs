export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    logoText: 'Test Title',
  },
  tests: [
    {
      it: 'рендерит картинку логотипа и текст',
      async: false,
      steps: `
        // Проверяем, что картинка логотипа присутствует
        expect(screen.getByAltText("логотип")).toBeInTheDocument();
        // Проверяем, что отображается переданный текст
        expect(screen.getByText('Test Title')).toBeInTheDocument();
      `,
    },
    {
      it: 'отображает только картинку, если logoText не задан',
      async: false,
      props: {
        logoText: '',
      },
      steps: `
        // Картинка логотипа должна быть в DOM
        expect(screen.getByAltText("логотип")).toBeInTheDocument();
        // Текст не должен отображаться
        expect(screen.queryByText(/./)).toBeNull();
      `,
    },
  ],
};
