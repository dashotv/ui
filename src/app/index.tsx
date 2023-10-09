/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import { RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import NavBar from 'components/NavBar';
import HomePage from 'pages/HomePage';
import DownloadsShowPage from 'pages/HomePage/DownloadsShowPage';
import RecentPage from 'pages/HomePage/RecentPage';
import UpcomingPage from 'pages/HomePage/UpcomingPage';
import MoviesPage from 'pages/MoviesPage';
import MoviesIndex from 'pages/MoviesPage/MoviesIndex';
import MoviesShow from 'pages/MoviesPage/MoviesShow';
import { NotFoundPage } from 'pages/NotFoundPage';
import ReleasesPage from 'pages/ReleasesPage';
import FeedsIndex from 'pages/ReleasesPage/FeedsIndex';
import FeedsShow from 'pages/ReleasesPage/FeedsShow';
import ReleasesIndex from 'pages/ReleasesPage/ReleasesIndex';
import ReleasesSearch from 'pages/ReleasesPage/ReleasesSearch';
import ReleasesShow from 'pages/ReleasesPage/ReleasesShow';
import SeriesPage from 'pages/SeriesPage';
import SeriesIndex from 'pages/SeriesPage/SeriesIndex';
import SeriesShow from 'pages/SeriesPage/SeriesShow';
import { GlobalStyle } from 'styles/global-styles';

import './index.scss';

export function ClerkWrapper({ children }) {
  return <SignedIn>{children}</SignedIn>;
}

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - DashoTV" defaultTitle="DashoTV">
        <meta name="description" content="DashoTV media server" />
      </Helmet>

      <NavBar />
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
        <Route
          path="/"
          element={
            <ClerkWrapper>
              <HomePage />
            </ClerkWrapper>
          }
        >
          <Route
            path=""
            element={
              <ClerkWrapper>
                <UpcomingPage />
              </ClerkWrapper>
            }
          />
          <Route
            path="recent"
            element={
              <ClerkWrapper>
                <RecentPage />
              </ClerkWrapper>
            }
          />
          <Route path="downloads">
            <Route
              path=":id"
              element={
                <ClerkWrapper>
                  <DownloadsShowPage />
                </ClerkWrapper>
              }
            />
          </Route>
        </Route>
        <Route
          path="series"
          element={
            <ClerkWrapper>
              <SeriesPage />
            </ClerkWrapper>
          }
        >
          <Route
            path=""
            element={
              <ClerkWrapper>
                <SeriesIndex />
              </ClerkWrapper>
            }
          />
          <Route
            path=":id"
            element={
              <ClerkWrapper>
                <SeriesShow />
              </ClerkWrapper>
            }
          />
        </Route>
        <Route
          path="movies"
          element={
            <ClerkWrapper>
              <MoviesPage />
            </ClerkWrapper>
          }
        >
          <Route
            path=""
            element={
              <ClerkWrapper>
                <MoviesIndex />
              </ClerkWrapper>
            }
          />
          <Route
            path=":id"
            element={
              <ClerkWrapper>
                <MoviesShow />
              </ClerkWrapper>
            }
          />
        </Route>
        <Route
          path="releases"
          element={
            <ClerkWrapper>
              <ReleasesPage />
            </ClerkWrapper>
          }
        >
          <Route
            path=""
            element={
              <ClerkWrapper>
                <ReleasesIndex />
              </ClerkWrapper>
            }
          />
          <Route
            path=":interval"
            element={
              <ClerkWrapper>
                <ReleasesIndex />
              </ClerkWrapper>
            }
          />
          <Route
            path="search"
            element={
              <ClerkWrapper>
                <ReleasesSearch />
              </ClerkWrapper>
            }
          />
          <Route
            path="search/:id"
            element={
              <ClerkWrapper>
                <ReleasesShow />
              </ClerkWrapper>
            }
          />
          <Route
            path="feeds"
            element={
              <ClerkWrapper>
                <FeedsIndex />
              </ClerkWrapper>
            }
          />
          <Route
            path="feeds/:id"
            element={
              <ClerkWrapper>
                <FeedsShow />
              </ClerkWrapper>
            }
          />
        </Route>
        <Route element={<NotFoundPage />} />
      </Routes>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <GlobalStyle />
    </>
  );
}
