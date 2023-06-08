/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UpcomingPage from './pages/HomePage/UpcomingPage';
import RecentPage from './pages/HomePage/RecentPage';

import SeriesPage from './pages/SeriesPage';
import SeriesIndex from './pages/SeriesPage/SeriesIndex';
import SeriesShow from './pages/SeriesPage/SeriesShow';

import MoviesPage from './pages/MoviesPage';
import MoviesIndex from './pages/MoviesPage/MoviesIndex';
import MoviesShow from './pages/MoviesPage/MoviesShow';

import ReleasesPage from './pages/ReleasesPage';
import ReleasesIndex from './pages/ReleasesPage/ReleasesIndex';
import ReleasesShow from './pages/ReleasesPage/ReleasesShow';

import FeedsPage from './pages/FeedsPage';
import FeedsIndex from './pages/FeedsPage/FeedsIndex';
import FeedsShow from './pages/FeedsPage/FeedsShow';

import { NotFoundPage } from './pages/NotFoundPage';

import NavBar from './components/NavBar';
import { GlobalStyle } from '../styles/global-styles';
import './index.scss';

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - DashoTV" defaultTitle="DashoTV">
        <meta name="description" content="DashoTV media server" />
      </Helmet>

      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<UpcomingPage />} />
          <Route path="recent" element={<RecentPage />} />
        </Route>
        <Route path="series" element={<SeriesPage />}>
          <Route path="" element={<SeriesIndex />} />
          <Route path=":id" element={<SeriesShow />} />
        </Route>
        <Route path="movies" element={<MoviesPage />}>
          <Route path="" element={<MoviesIndex />} />
          <Route path=":id" element={<MoviesShow />} />
        </Route>
        <Route path="releases" element={<ReleasesPage />}>
          <Route path="" element={<ReleasesIndex />} />
          <Route path=":id" element={<ReleasesShow />} />
        </Route>
        <Route path="feeds" element={<FeedsPage />}>
          <Route path="" element={<FeedsIndex />} />
          <Route path=":id" element={<FeedsShow />} />
        </Route>
        <Route element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}
