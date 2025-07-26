import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import { Header } from './Header';

describe('<Header />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<Header />);
  });

  it('рендерит header с навигацией и поиском', () => {
    renderWithProviders(<Header />);
    // Есть навигация (по роли или классу)
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // Есть элемент поиска (input)
    const input = document.querySelector('[data-qa="search-input"] input')!;
    expect(input).toBeInTheDocument();
  });
});
