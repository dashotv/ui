import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { JobsList } from 'components/Jobs/JobsList';
import LoadingIndicator from 'components/Loading';
import { useJobsQuery } from 'query/jobs';

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
