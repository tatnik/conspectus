export default {
  // Импорт для работы с тестовой утилитой screen
  imports: [`import { screen } from '@testing-library/react';`],
  // Пропсы не нужны
  tests: [
    {
      it: 'рендерит header с навигацией и поиском',
      async: false,
      steps: `
        // Есть навигация (по роли или классу)
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        // Есть элемент поиска (input)
        const input = document.querySelector('[data-qa="search-input"] input')!;
        expect(input).toBeInTheDocument();
      `,
    },
  ],
};
