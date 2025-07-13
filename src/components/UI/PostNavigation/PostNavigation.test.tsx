import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {PostNavigation} from './PostNavigation';


describe('<PostNavigation />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PostNavigation  heads={[]} pageTitle="" postBlockRef={{current: undefined}} />);
  });
  
});
