/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

import { RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import NavBar from 'components/NavBar';
import AdminPage from 'pages/AdminPage';
import JobsPage from 'pages/AdminPage/JobsPage';
import LogsPage from 'pages/AdminPage/LogsPage';
import RequestsPage from 'pages/AdminPage/RequestsPage';
import UsersPage from 'pages/AdminPage/UsersPage';
import HomePage from 'pages/HomePage';
import DownloadsShowPage from 'pages/HomePage/DownloadsShowPage';
import RecentPage from 'pages/HomePage/RecentPage';
import UpcomingPage from 'pages/HomePage/UpcomingPage';
import MoviesPage from 'pages/MoviesPage';
import ReleasesPage from 'pages/ReleasesPage';
import SeriesPage from 'pages/SeriesPage';
import { GlobalStyle } from 'styles/global-styles';

import './index.scss';

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
        <Routes>
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
          <Route path="/" element={withAuth(HomePage)}>
            <Route path="" element={withAuth(UpcomingPage)} />
            <Route path="recent" element={withAuth(RecentPage)} />
            <Route path="downloads">
              <Route path=":id" element={withAuth(DownloadsShowPage)} />
            </Route>
          </Route>
          <Route path="/admin" element={withAuth(AdminPage)}>
            <Route path="" element={withAuth(LogsPage)} />
            <Route path="jobs" element={withAuth(JobsPage)} />
            <Route path="requests" element={withAuth(RequestsPage)} />
            <Route path="users" element={withAuth(UsersPage)} />
          </Route>
          <Route path="series/*" element={withAuth(SeriesPage)} />
          <Route path="movies/*" element={withAuth(MoviesPage)} />
          <Route path="releases/*" element={withAuth(ReleasesPage)} />
          {/* <Route element={<NotFoundPage />} /> */}
        </Routes>
      </ErrorBoundary>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <GlobalStyle />
    </>
  );
}
