import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { LoadingIndicator } from '@dashotv/components';

import { Container } from 'components/Common';
import { WatchesList, useWatchesQuery } from 'components/Watches';

export default function WatchesPage() {
  const [page] = useState(1);
  const watches = useWatchesQuery(page);

  return (
    <>
      <Helmet>
        <title>Home - Watches</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {watches.isFetching && <LoadingIndicator />}
        {watches.data && <WatchesList watches={watches.data.result} />}
      </Container>
    </>
  );
}
