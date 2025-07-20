import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {NotFound} from './NotFound';



describe('<NotFound />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<NotFound  errorMessage={undefined} />);
  });
  
  it('отображает стандартное сообщение об ошибке', () => {
    renderWithProviders(<NotFound  errorMessage={undefined} />);
    // Сообщение об ошибке отображается (по умолчанию NOT_FOUND)
    expect(screen.getByText(/ошибка 404/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробуйте выбрать раздел из меню/i)).toBeInTheDocument();
    expect(screen.getByText(/главную/i)).toBeInTheDocument();
  });
  it('отображает переданное сообщение об ошибке', () => {
    renderWithProviders(<NotFound  errorMessage="Страница не найдена!" />);
    // Переданный текст ошибки отображается
    expect(screen.getByText('Страница не найдена!')).toBeInTheDocument();
  });
  it('есть ссылка на главную', () => {
    renderWithProviders(<NotFound  errorMessage={undefined} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/conspectus');
  });

});
