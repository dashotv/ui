import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import MoviesIndex from './MoviesIndex';
import MoviesShow from './MoviesShow';

export default function MoviesPage() {
  return (
    <>
      <Routes>
        <Route index path="" element={<MoviesIndex />} />
        <Route path=":id" element={<MoviesShow />} />
      </Routes>
      <Outlet />
    </>
  );
}
