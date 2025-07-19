import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';
     import { NO_CONTENT } from 'src/constants';
    

import {Post} from './Post';



describe('<Post />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Post  post="# Заголовок поста " prevPost={{id: 1, name: "Назад", path: "/prev"}} nextPost={{id: 2, name: "Вперёд", path: "/next"}} />);
  });
  
  it('отображает предупреждение, если пост пустой', () => {
    renderWithProviders(<Post  post="" prevPost={{id: 1, name: "Назад", path: "/prev"}} nextPost={{id: 2, name: "Вперёд", path: "/next"}} />);
    expect(screen.getByText(NO_CONTENT)).toBeInTheDocument();
  });
  it('отображает разметку markdown поста', () => {
    renderWithProviders(<Post  post="# Заголовок поста " prevPost={{id: 1, name: "Назад", path: "/prev"}} nextPost={{id: 2, name: "Вперёд", path: "/next"}} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
            expect(screen.queryAllByText('Заголовок поста').length).toEqual(1);
  });
  it('рендерит кнопки навигации для предыдущего и следующего поста', () => {
    renderWithProviders(<Post  post="# Заголовок поста " prevPost={{id: 1, name: "Назад", path: "/prev"}} nextPost={{id: 2, name: "Вперёд", path: "/next"}} />);
    expect(screen.getByText('Назад')).toBeInTheDocument();
            expect(screen.getByText('Вперёд')).toBeInTheDocument();
  });

});
