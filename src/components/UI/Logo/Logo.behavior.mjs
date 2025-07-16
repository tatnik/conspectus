export default {
  // Импорты только для этого теста (screen нужен, userEvent не требуется)
  imports: [`import { screen } from '@testing-library/react';`],
  // Основные тесты для компонента
  tests: [
    {
      it: 'отрисовывает ссылку на главную с логотипом',
      async: false,
      steps: `
        // Проверяем, что есть ссылка на '/'
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/');
        // Логотип (img)
        const img = screen.getByRole('img', { name: /логотип/i });
        expect(img).toBeInTheDocument();
      `,
    },
    {
      it: 'не отображает текст "конспекты" если logoText пустой',
      async: false,
      steps: `
        // Не должно быть текста "конспекты"
        expect(screen.queryByText('конспекты')).toBeNull();
      `,
    },
    {
      it: 'отображает переданный текст ',
      async: false,
      steps: `
        expect(screen.getByText('ЛогоТекст')).toBeInTheDocument();
      `,
      props: {
        logoText: 'ЛогоТекст',
      },
    },
  ],
};
