import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {Logo} from './Logo';



describe('<Logo />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Logo  logoText="Test Title" />);
  });
  
  it('рендерит картинку логотипа и текст', () => {
    renderWithProviders(<Logo  logoText="Test Title" />);
    // Проверяем, что картинка логотипа присутствует
            expect(screen.getByAltText("логотип")).toBeInTheDocument();
            // Проверяем, что отображается переданный текст
            expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  it('отображает только картинку, если logoText не задан', () => {
    renderWithProviders(<Logo  logoText="" />);
    // Картинка логотипа должна быть в DOM
            expect(screen.getByAltText("логотип")).toBeInTheDocument();
            // Текст не должен отображаться
            expect(screen.queryByText(/./)).toBeNull();
  });

});
