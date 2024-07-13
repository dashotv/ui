import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Container } from '@dashotv/components';

import DownloadsPage from './DownloadsPage';
import DownloadsShowPage from './DownloadsShowPage';

export default function Downloads() {
  return (
    <Container>
      <Routes>
        <Route path="">
          <Route path="" element={<DownloadsPage />} />
          <Route path=":id" element={<DownloadsShowPage />} />
        </Route>
      </Routes>
      <Outlet />
    </Container>
  );
}
