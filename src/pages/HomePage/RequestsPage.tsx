import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import { RequestsList } from 'components/Requests/RequestsList';
import { useRequestsQuery } from 'query/requests';

export default function RequestsPage() {
  const requests = useRequestsQuery();

  return (
    <>
      <Helmet>
        <title>Home - Requests</title>
        <meta name="description" content="dashotv" />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        {requests.isFetching && <LoadingIndicator />}
        {requests.data && <RequestsList requests={requests.data} />}
      </Container>
    </>
  );
}
