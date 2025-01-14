import * as React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Container } from 'components/Common';
import { DownloadsIndex, DownloadsShow } from 'components/Downloads';

export default function Downloads() {
  return (
    <Container>
      <Routes>
        <Route path="">
          <Route path="" element={<DownloadsIndex />} />
          <Route path=":id/*" element={<DownloadsShow />} />
        </Route>
      </Routes>
      <Outlet />
    </Container>
  );
}
