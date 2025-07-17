export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {},
  tests: [
    {
      it: 'корректно рендерит AppNav',
      async: false,
      steps: `
        // Должен быть nav-элемент с логотипом и навигацией
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(nav).toHaveClass('AppNav');
      `,
    },
  ],
};
