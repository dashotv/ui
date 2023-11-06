import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import { LogsList } from 'components/Logs/LogsList';
import { useSubscription } from 'components/Nats/useSubscription';
import { useLogsQuery } from 'query/logs';

export default function JobsPage() {
  const [page, setPage] = useState(1);
  const logs = useLogsQuery(page);
  const queryClient = useQueryClient();
  useSubscription('tower.logs', () => {
    queryClient.invalidateQueries({ queryKey: ['logs', page] });
  });

  return (
    <>
      <Helmet>
        <title>Home - Logs</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        {logs.isFetching && <LoadingIndicator />}
        {logs.data && <LogsList logs={logs.data} />}
      </Container>
    </>
  );
}