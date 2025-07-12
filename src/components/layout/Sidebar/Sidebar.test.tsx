import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { Sidebar } from './Sidebar';

describe('<Sidebar />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<Sidebar children={[]} />);
  });
});
