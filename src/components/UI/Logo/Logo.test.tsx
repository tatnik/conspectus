import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { Logo } from './Logo';

describe('<Logo />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<Logo />);
  });
});
