import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from 'src/app/App';

jest.mock('./AppRouter/AppRouter', () => ({
  AppRouter: () => <div data-testid="approuter">AppRouter mock</div>,
}));
jest.mock('@gravity-ui/uikit', () => ({
  Loader: () => <div data-testid="loader" />,
}));

describe('App', () => {
  it('рендерит AppRouter', () => {
    render(<App />);
    expect(screen.getByTestId('approuter')).toBeInTheDocument();
  });
});
