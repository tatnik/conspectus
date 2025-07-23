import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';




import {PageWrapper} from './PageWrapper';

describe('<PageWrapper />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PageWrapper  />);
  });
  
  it('рендерит Header, main и Footer', () => {
    renderWithProviders(<PageWrapper  />);
    // Проверяем наличие main-контента
    expect(screen.getByRole('main')).toBeInTheDocument();
    // Проверяем наличие Header (по роли navigation)
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // Проверяем наличие Footer (по тексту копирайта или alt-лого)
    expect(screen.getByText(/©|\(С\)|202[4-9]/)).toBeInTheDocument();
  });

});
