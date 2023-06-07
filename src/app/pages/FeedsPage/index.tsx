import { Route, Switch } from 'react-router-dom';
import FeedsIndex from './FeedsIndex';
import FeedsShow from './FeedsShow';
import React from 'react';
import SubNav from '../../components/SubNav';

export default function FeedsPage() {
  const items = [
    { name: 'Releases', path: '/releases' },
    { name: 'Feeds', path: '/feeds' },
  ];
  return (
    <>
      <SubNav items={items} />
      <Switch>
        <Route exact path="/feeds" component={FeedsIndex} />
        <Route exact path="/feeds/:id" component={FeedsShow} />
      </Switch>
    </>
  );
}
