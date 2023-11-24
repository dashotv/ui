import React from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { LoadingIndicator } from 'components/Common';
import { FeedsList, useFeedsAllQuery } from 'components/Releases';

export default function FeedsIndex() {
  const { isFetching, data } = useFeedsAllQuery();

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
      </Helmet>
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <FeedsList data={data} />}
      </Container>
    </>
  );
}
