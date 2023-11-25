import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { Gauges } from 'components/Guages';
import { Container } from 'components/Layout';
import SubNav from 'components/SubNav';

import JobsPage from './JobsPage';
import LogsPage from './LogsPage';
import RequestsPage from './RequestsPage';
import UsersPage from './UsersPage';

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

      <Routes>
        <Route index path="" element={<LogsPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Routes>
      <Outlet />
    </>
  );
}
