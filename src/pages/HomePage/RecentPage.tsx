import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { DownloadList, useDownloadsRecentQuery } from 'components/Downloads';
import LoadingIndicator from 'components/Loading';

const pagesize = 42;

export default function RecentPage() {
  const [page, setPage] = useState(1);

  const recent = useDownloadsRecentQuery(page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Home - Recent</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container sx={{ pt: '5px', pb: '5px' }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Pagination count={Math.ceil(recent?.data?.count ? recent.data.count / pagesize : 0)} onChange={handleChange} />
      </Container>
      <Container sx={{ pt: '5px', pb: '5px' }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container spacing={1}>
          {recent.isFetching && <LoadingIndicator />}
          {recent.data && <DownloadList downloads={recent.data?.results} />}
        </Grid>
      </Container>
    </>
  );
}
