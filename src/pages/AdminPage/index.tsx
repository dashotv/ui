import * as React from 'react';
import { Outlet } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { Gauges } from 'components/Guages';
import { Container } from 'components/Layout';
import SubNav from 'components/SubNav';

export default function HomePage() {
  const items = [
    { name: 'Logs', path: '/admin', exact: true },
    { name: 'Jobs', path: '/admin/jobs' },
    { name: 'Requests', path: '/admin/requests' },
    { name: 'Users', path: '/admin/users' },
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
      <Outlet />
    </>
  );
}
