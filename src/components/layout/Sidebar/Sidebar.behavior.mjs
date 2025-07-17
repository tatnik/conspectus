export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    children: ['test1', 'test2'],
  },
  tests: [
    {
      it: 'рендерит содержимое в <aside>',
      async: false,
      steps: `
        // Ищем aside и текст дочерних элементов
        const aside = screen.getByRole('complementary');
        expect(aside).toBeInTheDocument();
        expect(aside).toHaveTextContent('test1');
        expect(aside).toHaveTextContent('test2');
      `,
    },
  ],
};
