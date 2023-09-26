/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
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
          <Route path="downloads">
            <Route path=":id" element={<DownloadsShowPage />} />
          </Route>
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
          <Route path="search" element={<ReleasesSearch />} />
          <Route path=":id" element={<ReleasesShow />} />
          <Route path="feeds" element={<FeedsIndex />} />
          <Route path="feeds/:id" element={<FeedsShow />} />
        </Route>
        <Route element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}
