import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { LoadingIndicator } from 'components/Common';
import { JobsList } from 'components/Jobs';
import { useJobsQuery } from 'components/Jobs/query';

export default function JobsPage() {
  const [page] = useState(1);
  const jobs = useJobsQuery(page);

  return (
    <>
      <Helmet>
        <title>Home - Jobs</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        {jobs.isFetching && <LoadingIndicator />}
        {jobs.data && <JobsList jobs={jobs.data} />}
      </Container>
    </>
  );
}
