import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { IndexPage } from './IndexPage';

describe('<IndexPage />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<IndexPage />);
  });
});
