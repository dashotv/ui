import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';

// Use consistent styling
import 'sanitize.css/sanitize.css';

import { App } from 'app';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Initialize languages
import './locales/i18n';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOMClient.createRoot(MOUNT_NODE!).render(
  // <Provider store={store}>
  <ThemeProvider theme={darkTheme}>
    <Router>
      <CssBaseline />
      <HelmetProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HelmetProvider>
    </Router>
  </ThemeProvider>,
  // </Provider>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
