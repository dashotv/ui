import * as React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import { DownloadList } from 'app/components/Downloads';
import LoadingIndicator from 'app/components/Loading';
import { useDownloadsRecentQuery } from 'query/downloads';

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
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Pagination count={Math.ceil(recent.data?.count / pagesize)} onChange={handleChange} />
      </Container>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        {recent.isFetching && <LoadingIndicator />}
        {recent.data && <DownloadList downloads={recent.data?.results} />}
      </Container>
    </>
  );
}
