import React from 'react';
import ReactDOM from 'react-dom/client';

import { configure } from '@gravity-ui/uikit';

import { AppThemeProvider } from './app/providers/AppThemeProvider';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';

//import 'highlight.js/styles/github.css';

configure({
  lang: 'en',
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
