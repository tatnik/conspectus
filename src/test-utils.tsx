import React, { ReactNode, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppThemeProvider } from './shared/AppTheme';
import { AppContextProvider } from './app/AppContext/AppContextProvider';
type AllProvidersProps = {
  children: ReactNode;
  route?: string;
  routerProps?: MemoryRouterProps;
};

const AllProviders = ({ children, route = '/', routerProps }: AllProvidersProps) => (
  <Provider store={store}>
    <AppThemeProvider>
      <AppContextProvider>
        <MemoryRouter
          initialEntries={[route]}
          {...routerProps}
        >
          {children}
        </MemoryRouter>
      </AppContextProvider>
    </AppThemeProvider>
  </Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    route?: string;
    routerProps?: MemoryRouterProps;
  }
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllProviders
        route={options?.route}
        routerProps={options?.routerProps}
      >
        {children}
      </AllProviders>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as renderWithProviders };
