import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SubNav from '../../components/SubNav';
import { UpcomingPage } from './UpcomingPage';
import { RecentPage } from './RecentPage';
import { Gauges } from '../../components/Guages';

export function HomePage() {
  const items = [
    { name: 'Upcoming', path: '/' },
    { name: 'Recent', path: '/recent' },
  ];
  return (
    <>
      <Container style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={6}>
            <SubNav items={items} />
          </Grid>
          <Grid item xs={6}>
            <Gauges />
          </Grid>
        </Grid>
      </Container>
      <Switch>
        <Route exact path="/" component={UpcomingPage} />
        <Route exact path="/recent" component={RecentPage} />
      </Switch>
    </>
  );
}
