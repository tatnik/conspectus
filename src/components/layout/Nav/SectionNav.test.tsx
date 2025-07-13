import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {SectionNav} from './SectionNav';


describe('<SectionNav />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<SectionNav  />);
  });
  
});
