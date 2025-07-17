import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {Footer} from './Footer';


describe('<Footer />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Footer  />);
  });
  
  it('рендерит футер с логотипом и копирайтом', () => {
    renderWithProviders(<Footer  />);
    // Логотип есть
            expect(screen.getByAltText("логотип")).toBeInTheDocument();
            // Копирайт есть (через текст или label)
            expect(screen.getByText(/©|\(С\)|202[4-9]/)).toBeInTheDocument();
  });

});
