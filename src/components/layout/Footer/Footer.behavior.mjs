export default {
  imports: [`import { screen } from '@testing-library/react';`],
  tests: [
    {
      it: 'рендерит футер с логотипом и копирайтом',
      async: false,
      steps: `
        // Логотип есть
        expect(screen.getByAltText("логотип")).toBeInTheDocument();
        // Копирайт есть (через текст или label)
        expect(screen.getByText(/©|\\(С\\)|202[4-9]/)).toBeInTheDocument();
        // Есть компонент выбора темы
       expect(screen.getByText("Тема:")).toBeInTheDocument();
   `,
    },
  ],
};
