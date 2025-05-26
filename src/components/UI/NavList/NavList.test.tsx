import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { NavList } from './NavList';

describe('<NavList />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(
      <NavList
        navLinkArray={[]}
        classNameList=""
        renderProps={() => {}}
      />
    );
  });
});
