import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';




import {NavItem} from './NavItem';

describe('<NavItem />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<NavItem  to="/about" active={true} className="test-class" children="Навигация" />);
  });
  
  it('рендерит элемент списка с активной ссылкой и переданным текстом', () => {
    renderWithProviders(<NavItem  to="/about" active={true} className="test-class" children="Навигация" />);
    // Проверяет, что li с нужным классом есть в DOM
    const li = screen.getByText('Навигация').closest('li');
    expect(li).toHaveClass('NavItem');
    expect(li).toHaveClass('active');
    expect(li).toHaveClass('test-class');
    // Ссылка присутствует и ведёт на правильный путь
    const link = screen.getByRole('link', { name: 'Навигация' });
    expect(link).toHaveAttribute('href', '/about');
  });
  it('корректно рендерит неактивный пункт без дополнительного класса', () => {
    renderWithProviders(<NavItem  to="/docs" active={false} className="test-class" children="Документация" />);
    const li = screen.getByText('Документация').closest('li');
    expect(li).toHaveClass('NavItem');
    expect(li).not.toHaveClass('active');
    // ссылка ведет на /docs
    const link = screen.getByRole('link', { name: 'Документация' });
    expect(link).toHaveAttribute('href', '/docs');
  });
  it('отображает карточку или любой React-элемент в children', () => {
    
    renderWithProviders(
    <NavItem to="/card" active={false}><div data-testid="test-card">Card</div></NavItem>
    );
    // Проверяет наличие вложенного элемента с data-testid
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    // Проверяет ссылку
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/card');
  });

});
