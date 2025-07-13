import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {Footer} from './Footer';


describe('<Footer />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Footer  />);
  });
  
});
