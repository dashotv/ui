import React from 'react';
import { Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Gauges } from '../../components/Guages';
import SubNav from '../../components/SubNav';

export default function ReleasesPage() {
  const items = [
    { name: 'Releases', path: '/releases' },
    { name: 'Feeds', path: '/feeds' },
  ];
  return (
    <>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={6}>
            <SubNav items={items} />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Container>
      <Outlet />
    </>
  );
}
