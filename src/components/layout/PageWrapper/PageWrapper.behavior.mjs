export default {
  imports: [`import { screen } from '@testing-library/react';`],
  tests: [
    {
      it: 'рендерит Header, main и Footer',
      async: false,
      steps: `
        // Проверяем наличие main-контента
        expect(screen.getByRole('main')).toBeInTheDocument();
        // Проверяем наличие Header (по роли navigation)
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        // Проверяем наличие Footer (по тексту копирайта или alt-лого)
        expect(screen.getByText(/©|\\(С\\)|202[4-9]/)).toBeInTheDocument();
      `,
    },
  ],
};
