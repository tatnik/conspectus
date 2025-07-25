import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';




import {Header} from './Header';

describe('<Header />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Header  />);
  });
  
  it('рендерит header с навигацией, поиском и переключателем темы', () => {
    renderWithProviders(<Header  />);
    // Есть навигация (по роли или классу)
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // Есть элемент поиска (input или aria-label)
    expect(screen.getByLabelText(/Поиск/)).toBeInTheDocument();
  });

});
