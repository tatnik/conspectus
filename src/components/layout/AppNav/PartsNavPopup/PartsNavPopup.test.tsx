import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {PartsNavPopup} from './PartsNavPopup';



describe('<PartsNavPopup />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PartsNavPopup  isMainPage={false} />);
  });
  
  it('рендерит попап для навигации по разделам, если не главная страница', () => {
    renderWithProviders(<PartsNavPopup  isMainPage={false} />);
    // Должна быть кнопка или popup для перехода по разделам
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('не рендерится на главной странице', () => {
    renderWithProviders(<PartsNavPopup  isMainPage={true} />);
    // Должен вернуть null — ни одного popup или button
    expect(screen.queryByRole('button')).toBeNull();
  });

});
