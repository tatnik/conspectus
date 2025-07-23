import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';




import {PrevButton} from './PrevButton';

describe('<PrevButton />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PrevButton  postPath="/prev-post" postName="Предыдущий пост" className="prev-button-class" />);
  });
  
  it('отображает название предыдущего поста и кнопку', () => {
    renderWithProviders(<PrevButton  postPath="/prev-post" postName="Предыдущий пост" className="prev-button-class" />);
    // Проверяет, что текст предыдущего поста отображается
    expect(screen.getByText('Предыдущий пост')).toBeInTheDocument();
    // Кнопка "влево" есть
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('ссылка ведёт на правильный путь', () => {
    renderWithProviders(<PrevButton  postPath="/prev-post" postName="Предыдущий пост" className="prev-button-class" />);
    // Проверяет правильный href у ссылки
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/prev-post');
  });

});
