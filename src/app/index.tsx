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
import { MoviesPage } from './pages/MoviesPage';
import { ReleasesPage } from './pages/ReleasesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import NavBar from './components/NavBar';

import { GlobalStyle } from '../styles/global-styles';
import './index.scss';

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - DashoTV" defaultTitle="DashoTV">
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <NavBar />
      <Switch>
        <Route path="/series" component={SeriesPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/releases" component={ReleasesPage} />
        <Route path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
