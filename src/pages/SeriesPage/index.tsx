import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import SeriesIndex from './SeriesIndex';
import SeriesShow from './SeriesShow';

export default function SeriesPage() {
  return (
    <>
      <Routes>
        <Route index path="" element={<SeriesIndex />} />
        <Route path=":id/*" element={<SeriesShow />} />
      </Routes>
      <Outlet />
    </>
  );
}
