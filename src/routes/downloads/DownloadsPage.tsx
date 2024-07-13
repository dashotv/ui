import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Grid from '@mui/material/Grid';

import { Container, LoadingIndicator, Pagination } from '@dashotv/components';

import { DownloadList, useDownloadsRecentQuery } from 'components/Downloads';

const pagesize = 25;

export default function DownloadsPage() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const { isFetching, data } = useDownloadsRecentQuery(page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    if (!data?.total) return;
    setCount(Math.ceil((data.total || 0) / pagesize)); // Math.ceil((data?.count || 0) / pagesize)
    setTotal(data.total);
  }, [data?.total]);

  return (
    <>
      <Helmet>
        <title>Home - Recent</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Pagination size="small" count={count} page={page} total={total} onChange={handleChange} />
      </Container>
      <Container>
        <Grid container spacing={1}>
          {isFetching && <LoadingIndicator />}
          {data && <DownloadList downloads={data?.result} />}
        </Grid>
      </Container>
    </>
  );
}
