import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {PrevButton} from './PrevButton';


describe('<PrevButton />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PrevButton  postPath="" postName="" className="" />);
  });
  
});
