import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {ThemeSwitcher} from './ThemeSwitcher';


describe('<ThemeSwitcher />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<ThemeSwitcher  />);
  });
  
});
