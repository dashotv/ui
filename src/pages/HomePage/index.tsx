import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import DownloadsPage from './DownloadsPage';
import DownloadsShowPage from './DownloadsShowPage';
import NotFoundPage from './NotFoundPage';
import UpcomingPage from './UpcomingPage';

export default function HomePage() {
  return (
    <>
      <Routes>
        <Route path="" element={<UpcomingPage />} />
        <Route path="downloads">
          <Route path="" element={<DownloadsPage />} />
          <Route path=":id" element={<DownloadsShowPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Outlet />
    </>
  );
}
