import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { NavPopup } from './NavPopup';

describe('<NavPopup />', () => {
  const handleOnClick = jest.fn();
  const navLinks = [{ id: 1, name: 'Test', path: '/test' }];

  it('рендерится без ошибок', () => {
    renderWithProviders(
      <NavPopup
        navLinks={navLinks}
        handleOnClick={handleOnClick}
      />
    );
  });

  it('открывает popup при клике по кнопке', async () => {
    renderWithProviders(
      <NavPopup
        navLinks={navLinks}
        handleOnClick={handleOnClick}
      />
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button');
    await user.click(button);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('вызывает handleOnClick при клике по ссылке', async () => {
    renderWithProviders(
      <NavPopup
        navLinks={navLinks}
        handleOnClick={handleOnClick}
      />
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button');
    await user.click(button);
    await screen.findByRole('list');
    const link = screen.getByText('Test');
    await user.click(link);
    expect(handleOnClick).toHaveBeenCalled();
  });
});
