import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import { NavList } from './NavList';

describe('<NavList />', () => {
  it('рендерится без ошибок', () => {
    renderWithProviders(
      <NavList
        navLinkArray={[
          { id: 1, name: 'Link1', path: '/' },
          { id: 2, name: 'Link2', path: '/about' },
        ]}
        classNameList="nav"
        renderProps={(val) => val.name}
      />
    );
  });

  it('отрисовывает все navLinkArray как ссылки', () => {
    renderWithProviders(
      <NavList
        navLinkArray={[
          { id: 1, name: 'Link1', path: '/' },
          { id: 2, name: 'Link2', path: '/about' },
        ]}
        classNameList="nav"
        renderProps={(val) => val.name}
      />
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
    expect(links[0]).toHaveTextContent('Link1');
    expect(links[1]).toHaveTextContent('Link2');
  });
  it('вызывает renderProps для каждого элемента', () => {
    const renderProps = jest.fn();
    renderWithProviders(
      <NavList
        navLinkArray={[
          { id: 1, name: 'Link1', path: '/' },
          { id: 2, name: 'Link2', path: '/about' },
        ]}
        classNameList="nav"
        renderProps={renderProps}
      />
    );
    expect(renderProps).toHaveBeenCalledTimes(2);
  });
  it('применяет класс активного элемента для активного пути', () => {
    renderWithProviders(
      <NavList
        navLinkArray={[
          { id: 1, name: 'Link1', path: '/' },
          { id: 2, name: 'Link2', path: '/about' },
        ]}
        classNameList="nav"
        renderProps={(val) => val.name}
      />
    );
    const items = screen.getAllByRole('listitem');
    expect(items[0].className.split(' ')).toContain('active');
  });
});
