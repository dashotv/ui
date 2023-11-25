import React from 'react';
import { Helmet } from 'react-helmet-async';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { FeedsList, useFeedsAllQuery } from 'components/Releases';

export default function FeedsIndex() {
  const { isFetching, data } = useFeedsAllQuery();

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
      </Helmet>
      <Container>
        {isFetching && <LoadingIndicator />}
        {data && <FeedsList data={data} />}
      </Container>
    </>
  );
}
