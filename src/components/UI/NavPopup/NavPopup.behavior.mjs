export default {
  // Дополнительные импорты (подключаются только для этого теста)
  imports: [
    `import userEvent from '@testing-library/user-event';`,
    `import { screen } from '@testing-library/react';`,
  ],
  // Мок-пропсы
  props: {
    navLinks: [{ id: 1, name: 'Test', path: '/test' }],
    handleOnClick: '__JEST_FN__',
  },
  // Основные тесты для компонента
  tests: [
    {
      it: 'открывает popup при клике по кнопке',
      async: true,
      steps: `
        const user = userEvent.setup();
        const button = screen.getByRole('button');
        await user.click(button);
        expect(screen.getByRole('list')).toBeInTheDocument();
      `,
    },
    {
      it: 'вызывает handleOnClick при клике по ссылке',
      async: true,
      steps: `
        const user = userEvent.setup();
        const button = screen.getByRole('button');
        await user.click(button);
        await screen.findByRole('list');
        const link = screen.getByText('Test')
        await user.click(link);
        expect(handleOnClick).toHaveBeenCalled();
      `,
    },
  ],
};
