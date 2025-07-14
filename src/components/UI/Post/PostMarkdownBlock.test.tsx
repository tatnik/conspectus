import React from 'react';
import { renderWithProviders } from 'src/test-utils';

import {PostMarkdownBlock} from './PostMarkdownBlock';


describe('<PostMarkdownBlock />', () => {
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<PostMarkdownBlock  post="" blockRef={null} className={undefined} />);
  });
  
});
