import * as React from 'react';
import { Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Gauges } from '../../components/Guages';
import SubNav from '../../components/SubNav';

export default function HomePage() {
  const items = [
    { name: 'Upcoming', path: '/', exact: true },
    { name: 'Recent', path: '/recent' },
  ];
  return (
    <>
      <SubNav items={items} />
      <Outlet />
    </>
  );
}
