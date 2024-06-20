import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Grid } from '@mui/material';

import { LoadingIndicator, Pagination } from '@dashotv/components';
import { Container } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { Log, MessagesList, useLogsQuery } from 'components/Messages';
import { useSub } from 'hooks/sub';
import { EventLog } from 'types/events';

export default function LogsPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { isFetching, data } = useLogsQuery(page);
  const total = data?.total || 0;
  const pages = Math.ceil(total / 250);

  useSub('tower.logs', (data: EventLog) => {
    queryClient.setQueryData(['logs', page], (prev: Log[]) => {
      return [data.log, ...prev];
    });
  });

  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Home - Logs</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Pagination page={page} count={pages} total={total} onChange={onChange} />
          </Grid>
        </Grid>
        {isFetching && <LoadingIndicator />}
        {data?.result && <MessagesList data={data?.result} />}
      </Container>
    </>
  );
}
