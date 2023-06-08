import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SubNav from '../../components/SubNav';
import { Gauges } from '../../components/Guages';

export default function HomePage() {
  const items = [
    { name: 'Upcoming', path: '/', exact: true },
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

      <Outlet />
    </>
  );
}
