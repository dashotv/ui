import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import DownloadsShowPage from './DownloadsShowPage';
import NotFoundPage from './NotFoundPage';
import RecentPage from './RecentPage';
import UpcomingPage from './UpcomingPage';

export default function HomePage() {
  return (
    <>
      <Routes>
        <Route path="" element={<UpcomingPage />} />
        <Route path="recent" element={<RecentPage />} />
        <Route path="downloads">
          <Route path=":id" element={<DownloadsShowPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Outlet />
    </>
  );
}
