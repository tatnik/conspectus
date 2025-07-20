import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {NextButton} from './NextButton';



describe('<NextButton />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<NextButton  postPath="/next-post" postName="Следующий пост" className="next-button-class" />);
  });
  
  it('отображает название следующего поста и кнопку', () => {
    renderWithProviders(<NextButton  postPath="/next-post" postName="Следующий пост" className="next-button-class" />);
    expect(screen.getByText('Следующий пост')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('ссылка ведёт на правильный путь', () => {
    renderWithProviders(<NextButton  postPath="/next-post" postName="Следующий пост" className="next-button-class" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/next-post');
  });

});
