import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { useQueryClient } from '@tanstack/react-query';

import LoadingIndicator from 'components/Loading';
import { Log, LogsList, useLogsQuery } from 'components/Logs';
import { useSub } from 'hooks/useSub';

export default function JobsPage() {
  const [page] = useState(1);
  const logs = useLogsQuery(page);
  const queryClient = useQueryClient();

  useSub('tower.logs', data => {
    queryClient.setQueryData(['logs', page], (prev: Log[]) => {
      return [data.Log, ...prev];
    });
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
