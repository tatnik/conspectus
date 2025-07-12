import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { Search } from './Search';

describe('<Search />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<Search />);
  });
});
