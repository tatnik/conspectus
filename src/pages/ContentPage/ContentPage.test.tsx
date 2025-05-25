import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import {ContentPage} from './ContentPage';

describe('<ContentPage />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<ContentPage />);
  });
});
