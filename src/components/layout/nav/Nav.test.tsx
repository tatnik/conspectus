import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import {Nav} from './Nav';

describe('<Nav />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<Nav />);
  });
});
