import React from 'react';
import { Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';

import SubNav from 'components/SubNav';

export default function FeedsPage() {
  const items = [
    { name: 'Releases', path: '/releases' },
    { name: 'Feeds', path: '/feeds' },
  ];
  return (
    <>
      <Container maxWidth="xl">
        <SubNav items={items} />
      </Container>
      <Outlet />
    </>
  );
}
