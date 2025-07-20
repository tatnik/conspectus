import React, { ReactNode, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppThemeProvider } from './shared/AppTheme';
import { AppContextProvider } from './app/AppContext/AppContextProvider'; // добавь AppContext

type AllProvidersProps = {
  children: ReactNode;
  route?: string;
  routerProps?: MemoryRouterProps;
  mockContext?: any; // тип можно конкретизировать, если есть TypeAppContext
};

const AllProviders = ({ children, route = '/', routerProps, mockContext }: AllProvidersProps) => (
  <Provider store={store}>
    <AppThemeProvider>
      {mockContext ? (
        <AppContextProvider value={mockContext}>
          <MemoryRouter
            initialEntries={[route]}
            {...routerProps}
          >
            {children}
          </MemoryRouter>
        </AppContextProvider>
      ) : (
        <AppContextProvider>
          <MemoryRouter
            initialEntries={[route]}
            {...routerProps}
          >
            {children}
          </MemoryRouter>
        </AppContextProvider>
      )}
    </AppThemeProvider>
  </Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    route?: string;
    routerProps?: MemoryRouterProps;
    mockContext?: any; // добавь сюда
  }
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllProviders
        route={options?.route}
        routerProps={options?.routerProps}
        mockContext={options?.mockContext}
      >
        {children}
      </AllProviders>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as renderWithProviders };
