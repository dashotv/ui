import React, { useEffect, useState } from 'react';
import ReleasesIndex from './ReleasesIndex';
import { Route, Switch } from 'react-router-dom';

export function ReleasesPage() {
  return (
    <Switch>
      <Route exact path="/releases" component={ReleasesIndex} />
    </Switch>
  );
}
