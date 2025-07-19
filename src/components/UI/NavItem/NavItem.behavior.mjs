export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    to: '/about',
    active: true,
    className: 'test-class',
    children: 'Навигация',
  },
  tests: [
    {
      it: 'рендерит элемент списка с активной ссылкой и переданным текстом',
      async: false,
      steps: `
        // Проверяет, что li с нужным классом есть в DOM
        const li = screen.getByText('Навигация').closest('li');
        expect(li).toHaveClass('NavItem');
        expect(li).toHaveClass('active');
        expect(li).toHaveClass('test-class');
        // Ссылка присутствует и ведёт на правильный путь
        const link = screen.getByRole('link', { name: 'Навигация' });
        expect(link).toHaveAttribute('href', '/about');
      `,
    },
    {
      it: 'корректно рендерит неактивный пункт без дополнительного класса',
      async: false,
      props: {
        to: '/docs',
        active: false,
        children: 'Документация',
      },
      steps: `
        const li = screen.getByText('Документация').closest('li');
        expect(li).toHaveClass('NavItem');
        expect(li).not.toHaveClass('active');
        // ссылка ведет на /docs
        const link = screen.getByRole('link', { name: 'Документация' });
        expect(link).toHaveAttribute('href', '/docs');
      `,
    },
    {
      it: 'отображает карточку или любой React-элемент в children',
      async: false,
      noRender: true,
      steps: `
        renderWithProviders(
      <NavItem to="/card" active={false}><div data-testid="test-card">Card</div></NavItem>
    );
        // Проверяет наличие вложенного элемента с data-testid
        expect(screen.getByTestId('test-card')).toBeInTheDocument();
        // Проверяет ссылку
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/card');
      `,
    },
  ],
};
