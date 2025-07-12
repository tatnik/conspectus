import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { NextButton } from './NextButton';

describe('<NextButton />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(
      <NextButton
        postPath=""
        postName=""
        className=""
      />
    );
  });
});
