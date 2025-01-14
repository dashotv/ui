import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Container } from 'components/Common';
import { MoviesIndex, MoviesShow } from 'components/Movies';

export default function MoviesPage() {
  return (
    <Container>
      <Routes>
        <Route index path="" element={<MoviesIndex />} />
        <Route path=":id/*" element={<MoviesShow />} />
      </Routes>
      <Outlet />
    </Container>
  );
}
