import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SeriesIndex } from './SeriesIndex';
import { SeriesShow } from './SeriesShow';

export function SeriesPage() {
  return (
    <Switch>
      <Route exact path="/series" component={SeriesIndex} />
      <Route exact path="/series/:id" component={SeriesShow} />
    </Switch>
  );
}
