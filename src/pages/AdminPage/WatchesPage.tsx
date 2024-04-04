import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
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
