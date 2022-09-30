/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { MediaPage } from './pages/MediaPage';
import { ReleasesPage } from './pages/ReleasesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import NavBar from './components/NavBar';

import { GlobalStyle } from '../styles/global-styles';

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - DashoTV" defaultTitle="DashoTV">
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <NavBar />
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route path="/media" component={MediaPage} />
        <Route path="/releases" component={ReleasesPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
