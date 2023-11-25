import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useQueryClient } from '@tanstack/react-query';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { Log, LogsList, useLogsQuery } from 'components/Logs';
import { useSub } from 'hooks/useSub';
import { EventLog } from 'types/events';

export default function JobsPage() {
  const [page] = useState(1);
  const logs = useLogsQuery(page);
  const queryClient = useQueryClient();

  useSub('tower.logs', (data: EventLog) => {
    queryClient.setQueryData(['logs', page], (prev: Log[]) => {
      return [data.log, ...prev];
    });
  });

  return (
    <>
      <Helmet>
        <title>Home - Logs</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {logs.isFetching && <LoadingIndicator />}
        {logs.data && <LogsList logs={logs.data} />}
      </Container>
    </>
  );
}
