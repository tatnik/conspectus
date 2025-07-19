import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {AppNav} from './AppNav';



describe('<AppNav />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<AppNav  />);
  });
  
  it('корректно рендерит AppNav', () => {
    renderWithProviders(<AppNav  />);
    // Должен быть nav-элемент с логотипом и навигацией
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();
            expect(nav).toHaveClass('AppNav');
  });

});
