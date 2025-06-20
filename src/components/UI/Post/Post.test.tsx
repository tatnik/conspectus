import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { Post } from './Post';
import { EMPTY_LINK } from 'src/constants';

describe('<Post />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(
      <Post
        post=""
        prevPost={EMPTY_LINK}
        nextPost={EMPTY_LINK}
      />
    );
  });
});
