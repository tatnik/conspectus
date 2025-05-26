import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { NavPopup } from './NavPopup';

describe('<NavPopup />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(
      <NavPopup
        navLinks={[]}
        handleOnClick={() => {}}
      />
    );
  });
});
