/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { SeriesPage } from './pages/SeriesPage';
import FeedsPage from './pages/FeedsPage';
import { MoviesPage } from './pages/MoviesPage';
import { ReleasesPage } from './pages/ReleasesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecentPage } from './pages/HomePage/RecentPage';

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
      <Switch>
        <Route path="/series" component={SeriesPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/releases" component={ReleasesPage} />
        <Route path="/feeds" component={FeedsPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/recent" component={RecentPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
