import React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as ReactDOMClient from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from 'app';
import { SnackbarProvider } from 'notistack';
// Use consistent styling
import 'sanitize.css/sanitize.css';

import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { NatsProvider } from '@dashotv/react-nats-context';
import { init as initApm } from '@elastic/apm-rum';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const nats = import.meta.env.PROD ? 'wss://www.dasho.tv:9222/' : 'ws://10.0.4.62:59222/';
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      staleTime: 5 * 1000,
      throwOnError: true,
    },
  },
});

if (!import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
const clerkPubKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

const apm = initApm({
  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'ui-dev',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: '//apm.dasho.tv',

  // Set service version (required for sourcemap feature)
  serviceVersion: '0.1.0',
});
apm.setInitialPageLoadName('index');

const Root = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        disableWindowBlurListener={true}
        TransitionProps={{ direction: 'down' }}
        dense={true}
      >
        <NatsProvider maxReconnectAttempts={1000} servers={[nats]}>
          <Router>
            <CssBaseline />
            <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </HelmetProvider>
          </Router>
        </NatsProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const RootWithAuth = () => {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: dark,
      }}
    >
      <Root />
    </ClerkProvider>
  );
};

const rootNode = ReactDOMClient.createRoot(MOUNT_NODE!);
if (import.meta.env.PROD) {
  rootNode.render(<RootWithAuth />);
} else {
  rootNode.render(<Root />);
}

// Hot reloadable translation json files
// if (module.hot) {
//   module.hot.accept(['./locales/i18n'], () => {
//     // No need to render the App again because i18next works with the hooks
//   });
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
