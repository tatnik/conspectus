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
      it: 'не отображает текст "Конспекты" если logoText пустой',
      async: false,
      steps: `
        // Не должно быть текста "Конспекты"
        expect(screen.queryByText('Конспекты')).toBeNull();
      `,
    },
    {
      it: 'отображает текст "Конспекты" если передан logoText',
      async: false,
      steps: `
        expect(screen.getByText('Конспекты')).toBeInTheDocument();
      `,
      props: {
        logoText: '1', // любое непустое значение, чтобы сработал рендер <Text>
      },
    },
  ],
};
