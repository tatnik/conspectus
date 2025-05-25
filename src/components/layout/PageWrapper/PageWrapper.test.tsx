import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import {PageWrapper} from './PageWrapper';

describe('<PageWrapper />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<PageWrapper />);
  });
});
