import React from 'react';
import { Outlet } from 'react-router-dom';

import SubNav from 'app/components/SubNav';

export default function FeedsPage() {
  const items = [
    { name: 'Releases', path: '/releases' },
    { name: 'Feeds', path: '/feeds' },
  ];
  return (
    <>
      <SubNav items={items} />
      <Outlet />
    </>
  );
}
