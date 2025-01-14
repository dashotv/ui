import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Grid } from '@mui/material';

import { LoadingIndicator, Pagination } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { Container } from 'components/Common';
import { RequestsList, useRequestsQuery } from 'components/Requests';
import { useSub } from 'hooks/sub';

const pagesize = 25;
export default function RequestsPage() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { isFetching, data: requests } = useRequestsQuery(page);
  const total = requests?.total || 0;
  const pages = Math.ceil(total / pagesize);
  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6} justifyContent="end">
            <Pagination page={page} total={total} count={pages} onChange={onChange} />
          </Grid>
        </Grid>
        {isFetching && <LoadingIndicator />}
        {requests ? <RequestsList requests={requests.result} /> : null}
      </Container>
    </>
  );
}
