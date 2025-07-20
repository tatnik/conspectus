import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {PrevNextButtons} from './PrevNextButtons';



describe('<PrevNextButtons />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PrevNextButtons  prevPost={{id: 1, name: "Предыдущий пост", path: "/prev-post"}} nextPost={{id: 2, name: "Следующий пост", path: "/next-post"}} />);
  });
  
  it('отображает обе кнопки если есть prevPost и nextPost', () => {
    renderWithProviders(<PrevNextButtons  prevPost={{id: 1, name: "Предыдущий пост", path: "/prev-post"}} nextPost={{id: 2, name: "Следующий пост", path: "/next-post"}} />);
    expect(screen.getByText('Предыдущий пост')).toBeInTheDocument();
    expect(screen.getByText('Следующий пост')).toBeInTheDocument();
  });
  it('не отображает кнопку предыдущего поста если prevPost не задан', () => {
    renderWithProviders(<PrevNextButtons  prevPost={undefined} nextPost={{id: 2, name: "Следующий пост", path: "/next-post"}} />);
    expect(screen.queryByText('Предыдущий пост')).toBeNull();
    expect(screen.getByText('Следующий пост')).toBeInTheDocument();
  });
  it('не отображает кнопку следующего поста если nextPost не задан', () => {
    renderWithProviders(<PrevNextButtons  prevPost={{id: 1, name: "Предыдущий пост", path: "/prev-post"}} nextPost={undefined} />);
    expect(screen.queryByText('Следующий пост')).toBeNull();
    expect(screen.getByText('Предыдущий пост')).toBeInTheDocument();
  });

});
