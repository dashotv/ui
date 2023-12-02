import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { JobsList } from 'components/Jobs';
import { useJobsQuery } from 'components/Jobs/query';
import { Container } from 'components/Layout';

export default function JobsPage() {
  const [page] = useState(1);
  const jobs = useJobsQuery(page);

  return (
    <>
      <Helmet>
        <title>Home - Jobs</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <WrapErrorBoundary>
          {jobs.isFetching && <LoadingIndicator />}
          {jobs.data && <JobsList jobs={jobs.data} />}
        </WrapErrorBoundary>
      </Container>
    </>
  );
}
