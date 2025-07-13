import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {MainNav} from './MainNav';


describe('<MainNav />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<MainNav  isMainPage={false} />);
  });
  
});
