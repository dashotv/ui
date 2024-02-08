import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CombinationsView } from 'components/Combinations';

export default function CombinationsPage() {
  return (
    <>
      <Helmet>
        <title>Home - Stuff</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <CombinationsView />
    </>
  );
}
