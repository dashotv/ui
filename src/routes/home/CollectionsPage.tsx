import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CollectionList } from 'components/Collections';
import { Combinations } from 'components/Combinations';

export default function CollectionsPage() {
  const [page] = useState(1);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <CollectionList {...{ page }} />
      <Combinations />
    </>
  );
}
