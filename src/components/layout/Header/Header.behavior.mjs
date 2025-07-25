export default {
  // Импорт для работы с тестовой утилитой screen
  imports: [`import { screen } from '@testing-library/react';`],
  // Пропсы не нужны
  tests: [
    {
      it: 'рендерит header с навигацией, поиском и переключателем темы',
      async: false,
      steps: `
        // Есть навигация (по роли или классу)
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        // Есть элемент поиска (input или aria-label)
        expect(screen.getByLabelText(/Поиск/)).toBeInTheDocument();
      `,
    },
  ],
};
