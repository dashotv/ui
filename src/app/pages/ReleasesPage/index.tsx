import React from 'react';
import ReleasesIndex from './ReleasesIndex';
import { Route, Switch } from 'react-router-dom';
import SubNav from '../../components/SubNav';
import ReleasesShow from './ReleasesShow';
import ReleasesFeeds from './ReleasesFeeds';

export function ReleasesPage() {
  const items = [
    { name: 'Releases', path: '/releases' },
    { name: 'Feeds', path: '/releases/feeds' },
  ];
  return (
    <>
      <SubNav items={items} />
      <Switch>
        <Route exact path="/releases" component={ReleasesIndex} />
        <Route exact path="/releases/feeds" component={ReleasesFeeds} />
        <Route exact path="/releases/:id" component={ReleasesShow} />
      </Switch>
    </>
  );
}
