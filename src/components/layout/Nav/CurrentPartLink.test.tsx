import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { CurrentPartLink } from './CurrentPartLink';

describe('<CurrentPartLink />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(
      <CurrentPartLink
        isMainPage={false}
        isPartIndexPage={false}
      />
    );
  });
});
