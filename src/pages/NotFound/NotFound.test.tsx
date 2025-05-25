import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import {NotFound} from './NotFound';

describe('<NotFound />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<NotFound />);
  });
});
