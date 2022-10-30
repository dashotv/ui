import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubNav from '../../components/SubNav';
import { UpcomingPage } from './UpcomingPage';
import { RecentPage } from './RecentPage';

export function HomePage() {
  const items = [
    { name: 'Upcoming', path: '/' },
    { name: 'Recent', path: '/recent' },
  ];
  return (
    <>
      <SubNav items={items} />
      <Switch>
        <Route exact path="/" component={UpcomingPage} />
        <Route exact path="/recent" component={RecentPage} />
      </Switch>
    </>
  );
}
