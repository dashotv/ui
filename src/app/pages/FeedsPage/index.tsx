import { Outlet } from 'react-router-dom';
import React from 'react';
import SubNav from '../../components/SubNav';

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
