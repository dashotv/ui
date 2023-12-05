import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { LoadingIndicator } from 'components/Common';
import { DownloadList, useDownloadsRecentQuery } from 'components/Downloads';
import { Container } from 'components/Layout';

const pagesize = 42;

export default function DownloadsPage() {
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
      <Container>
        <Pagination count={Math.ceil(recent?.data?.count ? recent.data.count / pagesize : 0)} onChange={handleChange} />
      </Container>
      <Container>
        <Grid container spacing={1}>
          {recent.isFetching && <LoadingIndicator />}
          {recent.data && <DownloadList downloads={recent.data?.results} />}
        </Grid>
      </Container>
    </>
  );
}
