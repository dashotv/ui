import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { Gauges } from 'components/Guages';
import { Container } from 'components/Layout';
import SubNav from 'components/SubNav';

import DownloadsShowPage from './DownloadsShowPage';
import RecentPage from './RecentPage';
import UpcomingPage from './UpcomingPage';

export default function HomePage() {
  const items = [
    { name: 'Upcoming', path: '/', exact: true },
    { name: 'Recent', path: '/recent' },
  ];
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <SubNav items={items} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Gauges />
          </Grid>
        </Grid>
      </Container>

      <Routes>
        <Route path="" element={<UpcomingPage />} />
        <Route path="recent" element={<RecentPage />} />
        <Route path="downloads">
          <Route path=":id" element={<DownloadsShowPage />} />
        </Route>
      </Routes>
      <Outlet />
    </>
  );
}
