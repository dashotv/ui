import React from 'react';
import { Helmet } from 'react-helmet-async';

import { FeedsList, IndexersList } from 'components/Releases';

export default function FeedsIndex() {
  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
      </Helmet>
      <IndexersList />
      <FeedsList />
    </>
  );
}
