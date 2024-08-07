/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React, { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import AdminPage from 'routes/admin';
import DownloadsPage from 'routes/downloads';
import HomePage from 'routes/home';
import MoviesPage from 'routes/movies';
import SeriesPage from 'routes/series';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

import { RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { NavBar } from 'components/NavBar';
import { GlobalStyle } from 'styles/global-styles';

import './index.scss';

const RunicApp = lazy(() => import('runic/App'));
const RunicAppWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RunicApp mount="/runic" />
    </Suspense>
  );
};
const MinionApp = lazy(() => import('minion/App'));
const MinionAppWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MinionApp mount="/minion" />
    </Suspense>
  );
};
const RiftApp = lazy(() => import('rift/App'));
const RiftAppWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RiftApp mount="/rift" />
    </Suspense>
  );
};

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Alert severity="error" onClose={() => resetErrorBoundary()}>
          <AlertTitle>Failure</AlertTitle>
          <div role="alert">{error.message}</div>
        </Alert>
      </Box>
    </>
  );
}

const withAuth = (Component: React.ComponentType) => {
  if (import.meta.env.MODE === 'development') {
    return <Component />;
  }
  return (
    <SignedIn>
      <Component />
    </SignedIn>
  );
};

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - DashoTV" defaultTitle="DashoTV">
        <meta name="description" content="DashoTV media server" />
      </Helmet>

      <ErrorBoundary fallbackRender={fallbackRender}>
        <NavBar />
        <Box sx={{ ml: { xs: 0, md: '240px' }, p: 1 }}>
          <Routes>
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
            <Route path="downloads/*" element={withAuth(DownloadsPage)} />
            <Route path="admin/*" element={withAuth(AdminPage)} />
            <Route path="series/*" element={withAuth(SeriesPage)} />
            <Route path="movies/*" element={withAuth(MoviesPage)} />
            <Route path="runic/*" element={withAuth(RunicAppWrapper)} />
            <Route path="minion/*" element={withAuth(MinionAppWrapper)} />
            <Route path="rift/*" element={withAuth(RiftAppWrapper)} />
            <Route path="/*" element={withAuth(HomePage)} />
          </Routes>
        </Box>
      </ErrorBoundary>
      {import.meta.env.PROD && (
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      )}

      <GlobalStyle />
    </>
  );
}
