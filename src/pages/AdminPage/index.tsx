import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import JobsPage from './JobsPage';
import LogsPage from './LogsPage';
import RequestsPage from './RequestsPage';
import UsersPage from './UsersPage';

export default function HomePage() {
  return (
    <>
      <Routes>
        <Route index path="" element={<LogsPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Routes>
      <Outlet />
    </>
  );
}
