import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import { useSubscription } from 'components/Nats/useSubscription';
import { RequestsList } from 'components/Requests/RequestsList';
import { useRequestsQuery } from 'query/requests';

export default function RequestsPage() {
  const [page, setPage] = useState(1);
  const requests = useRequestsQuery(page);
  const queryClient = useQueryClient();
  useSubscription('tower.requests', () => {
    console.log('tower.requests');
    queryClient.invalidateQueries({ queryKey: ['requests', page] });
  });

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
