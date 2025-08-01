import React from 'react';
import ReactDOM from 'react-dom/client';

import { configure } from '@gravity-ui/uikit';

import { App } from './app/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './store';
import { AppThemeProvider } from './shared/AppTheme';

configure({
  lang: 'en',
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.log);
