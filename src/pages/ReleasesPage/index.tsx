import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Container } from 'components/Layout';
import FeedsIndex from 'pages/ReleasesPage/FeedsIndex';
import ReleasesIndex from 'pages/ReleasesPage/ReleasesIndex';
import ReleasesSearch from 'pages/ReleasesPage/ReleasesSearch';

export default function ReleasesPage() {
  return (
    <Container>
      <Routes>
        <Route index path="" element={<ReleasesIndex />} />
        <Route path=":interval" element={<ReleasesIndex />} />
        <Route path="search" element={<ReleasesSearch />} />
        <Route path="feeds" element={<FeedsIndex />} />
      </Routes>
      <Outlet />
    </Container>
  );
}
