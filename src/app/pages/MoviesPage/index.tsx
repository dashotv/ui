import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MoviesIndex } from './MoviesIndex';
import { MoviesShow } from './MoviesShow';

export function MoviesPage() {
  return (
    <Switch>
      <Route exact path="/movies" component={MoviesIndex} />
      <Route exact path="/movies/:id" component={MoviesShow} />
    </Switch>
  );
}
