export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    errorMessage: undefined, // по умолчанию NOT_FOUND
  },
  tests: [
    {
      it: 'отображает стандартное сообщение об ошибке',
      async: false,
      steps: `
        // Сообщение об ошибке отображается (по умолчанию NOT_FOUND)
        expect(screen.getByText(/ошибка 404/i)).toBeInTheDocument();
        expect(screen.getByText(/Попробуйте выбрать раздел из меню/i)).toBeInTheDocument();
        expect(screen.getByText(/главную/i)).toBeInTheDocument();
      `,
    },
    {
      it: 'отображает переданное сообщение об ошибке',
      async: false,
      props: {
        errorMessage: 'Страница не найдена!',
      },
      steps: `
        // Переданный текст ошибки отображается
        expect(screen.getByText('Страница не найдена!')).toBeInTheDocument();
      `,
    },
    {
      it: 'есть ссылка на главную',
      async: false,
      steps: `
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/conspectus');
      `,
    },
  ],
};
