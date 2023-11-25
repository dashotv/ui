import React from 'react';
import { Outlet } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { Container } from 'components/Layout';
import SubNav from 'components/SubNav';

export default function ReleasesPage() {
  const items = [
    { name: 'Daily', path: '/releases', exact: true },
    { name: 'Weekly', path: '/releases/weekly' },
    { name: 'Monthly', path: '/releases/monthly' },
    { name: 'Search', path: '/releases/search' },
    { name: 'Feeds', path: '/releases/feeds' },
  ];
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <SubNav items={items} />
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>
      <Outlet />
    </>
  );
}
