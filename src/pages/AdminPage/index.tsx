import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import JobsPage from './JobsPage';
import LogsPage from './LogsPage';
import RequestsPage from './RequestsPage';
import UsersPage from './UsersPage';
import WatchesPage from './WatchesPage';

export default function HomePage() {
  return (
    <>
      <Routes>
        <Route index path="" element={<JobsPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="watches" element={<WatchesPage />} />
      </Routes>

      <Outlet />
    </>
  );
}
