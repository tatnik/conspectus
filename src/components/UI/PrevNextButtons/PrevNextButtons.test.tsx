import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {PrevNextButtons} from './PrevNextButtons';


describe('<PrevNextButtons />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PrevNextButtons  prevPost={{id: 0, name: "", path: ""}} nextPost={{id: 0, name: "", path: ""}} />);
  });
  
});
