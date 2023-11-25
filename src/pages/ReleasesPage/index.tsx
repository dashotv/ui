import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { Container } from 'components/Layout';
import SubNav from 'components/SubNav';
import FeedsIndex from 'pages/ReleasesPage/FeedsIndex';
import ReleasesIndex from 'pages/ReleasesPage/ReleasesIndex';
import ReleasesSearch from 'pages/ReleasesPage/ReleasesSearch';

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
      <Routes>
        <Route index path="" element={<ReleasesIndex />} />
        <Route path=":interval" element={<ReleasesIndex />} />
        <Route path="search" element={<ReleasesSearch />} />
        <Route path="feeds" element={<FeedsIndex />} />
      </Routes>
      <Outlet />
    </>
  );
}
