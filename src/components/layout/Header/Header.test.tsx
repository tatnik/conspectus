import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {Header} from './Header';


describe('<Header />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Header  />);
  });
  
});
