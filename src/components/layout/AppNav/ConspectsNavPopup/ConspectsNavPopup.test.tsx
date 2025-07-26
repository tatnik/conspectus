import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import { ConspectsNavPopup } from './ConspectsNavPopup';

describe('<ConspectsNavPopup />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(<ConspectsNavPopup />);
  });

  it('не рендерится если нет showPartNav или нет partNav', () => {
    renderWithProviders(<ConspectsNavPopup />);
    // Проверяем, что ничего не отрисовано
    expect(screen.queryByRole('button')).toBeNull();
  });
  it('рендерит NavPopup если есть partNav и showPartNav', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();

    const mockContext = {
      currentPart: { id: 1, name: 'Раздел', path: '/section' },
      siteNav: [
        { id: 0, name: 'Main', path: '/' },
        { id: 1, name: 'Раздел', path: '/section' },
      ],
      partNavArray: [[], [{ id: 1, name: 'Conspect', path: '/test/conspect' }]],
      showPartNav: true,
      setCurrentPart,
      setShowPartNav,
      setPartNavArray,
      loadPartNav,
      dataError: '',
      setDataError,
    };

    renderWithProviders(<ConspectsNavPopup />, { mockContext });
    // Должен быть NavPopup
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
