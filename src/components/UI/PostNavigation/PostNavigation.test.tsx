import React, { createRef } from 'react';
import { renderWithProviders } from 'src/test-utils';
import { PostNavigation } from './PostNavigation';

describe('<PostNavigation />', () => {
  it('рендерится без ошибок', () => {
    const ref = createRef<HTMLDivElement>();
    renderWithProviders(
      <PostNavigation
        heads={[]}
        pageTitle=""
        postBlockRef={ref}
      />
    );
  });
});
