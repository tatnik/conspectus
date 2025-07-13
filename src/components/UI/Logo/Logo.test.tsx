import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {Logo} from './Logo';


describe('<Logo />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Logo  logoText={undefined} />);
  });
  
  it('отрисовывает ссылку на главную с логотипом', () => {
    renderWithProviders(<Logo  logoText={undefined} />);
    // Проверяем, что есть ссылка на '/'
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('href', '/');
            // Логотип (img)
            const img = screen.getByRole('img', { name: /логотип/i });
            expect(img).toBeInTheDocument();
  });
  it('не отображает текст "Конспекты" если logoText пустой', () => {
    renderWithProviders(<Logo  logoText={undefined} />);
    // Не должно быть текста "Конспекты"
            expect(screen.queryByText('Конспекты')).toBeNull();
  });
  it('отображает текст "Конспекты" если передан logoText', () => {
    renderWithProviders(<Logo  logoText="1" />);
    expect(screen.getByText('Конспекты')).toBeInTheDocument();
  });

});
