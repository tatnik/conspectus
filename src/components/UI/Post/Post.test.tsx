import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {Post} from './Post';


describe('<Post />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Post  post="" prevPost={{id: 0, name: "", path: ""}} nextPost={{id: 0, name: "", path: ""}} />);
  });
  
});
