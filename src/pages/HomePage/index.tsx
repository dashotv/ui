import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Container } from '@dashotv/components';

import CollectionsPage from './CollectionsPage';
import CombinationsPage from './CombinationsPage';
import DownloadsPage from './DownloadsPage';
import DownloadsShowPage from './DownloadsShowPage';
import NotFoundPage from './NotFoundPage';
import UpcomingPage from './UpcomingPage';

export default function HomePage() {
  return (
    <Container>
      <Routes>
        <Route path="" element={<UpcomingPage />} />
        <Route path="collections">
          <Route path="" element={<CollectionsPage />} />
          <Route path="combinations/:name" element={<CombinationsPage />} />
        </Route>
        <Route path="downloads">
          <Route path="" element={<DownloadsPage />} />
          <Route path=":id" element={<DownloadsShowPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Outlet />
    </Container>
  );
}
