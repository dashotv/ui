import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { LoadingIndicator } from '@dashotv/components';
import { Container } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { RequestsList, useRequestsQuery } from 'components/Requests';
import { useSub } from 'hooks/sub';

export default function RequestsPage() {
  const [page] = useState(1);
  const requests = useRequestsQuery(page);
  const queryClient = useQueryClient();
  useSub('tower.requests', () => {
    console.log('tower.requests');
    queryClient.invalidateQueries({ queryKey: ['requests', page] });
  });

  return (
    <>
      <Helmet>
        <title>Home - Requests</title>
        <meta name="description" content="dashotv" />
      </Helmet>
      <Container>
        {requests.isFetching && <LoadingIndicator />}
        {requests.data && <RequestsList requests={requests.data.result} />}
      </Container>
    </>
  );
}
