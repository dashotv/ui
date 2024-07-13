import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Container } from '@dashotv/components';

import { SeriesIndex, SeriesShow } from 'components/Series';

export default function SeriesPage() {
  return (
    <Container>
      <Routes>
        <Route index path="" element={<SeriesIndex />} />
        <Route path=":id/*" element={<SeriesShow />} />
      </Routes>
      <Outlet />
    </Container>
  );
}
