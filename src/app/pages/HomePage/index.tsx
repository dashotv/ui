import * as React from 'react';
import { Outlet } from 'react-router-dom';

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
