import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {AppThemeProvider} from './AppThemeProvider';


describe('<AppThemeProvider />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<AppThemeProvider  children={undefined} />);
  });
  
});
