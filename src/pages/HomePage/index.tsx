import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import CollectionsPage from './CollectionsPage';
import DownloadsPage from './DownloadsPage';
import DownloadsShowPage from './DownloadsShowPage';
import NotFoundPage from './NotFoundPage';
import StuffPage from './StuffPage';
import UpcomingPage from './UpcomingPage';

export default function HomePage() {
  return (
    <>
      <Routes>
        <Route path="" element={<UpcomingPage />} />
        <Route path="collections">
          <Route path="" element={<CollectionsPage />} />
        </Route>
        <Route path="downloads">
          <Route path="" element={<DownloadsPage />} />
          <Route path=":id" element={<DownloadsShowPage />} />
        </Route>
        <Route path="/stuff" element={<StuffPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Outlet />
    </>
  );
}
