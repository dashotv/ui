import * as React from 'react';
import { Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Gauges } from 'components/Guages';
import SubNav from 'components/SubNav';

export default function HomePage() {
  const items = [
    { name: 'Upcoming', path: '/', exact: true },
    { name: 'Recent', path: '/recent' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Requests', path: '/requests' },
    { name: 'Users', path: '/users' },
  ];
  return (
    <>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={6}>
            <SubNav items={items} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Gauges />
          </Grid>
        </Grid>
      </Container>
      <Outlet />
    </>
  );
}
