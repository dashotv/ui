import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useQueryClient } from '@tanstack/react-query';

import { LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { JobsList } from 'components/Jobs';
import { Job } from 'components/Jobs';
import { useJobsQuery } from 'components/Jobs/query';
import { Container } from 'components/Layout';
import { useSub } from 'hooks/sub';
import { EventJob } from 'types/events';

export default function JobsPage() {
  const [page] = useState(1);
  const jobs = useJobsQuery(page);
  const queryClient = useQueryClient();
  useSub('tower.jobs', (data: EventJob) => {
    // console.log('tower.jobs');
    if (data.event === 'created') {
      queryClient.setQueryData(['jobs', page], (prev: Job[]) => {
        return [data.job, ...prev];
      });
      return;
    }
    if (data.event === 'updated') {
      queryClient.setQueryData(['jobs', page], (prev: Job[]) => {
        return [...prev.map(job => (job.id === data.id ? data.job : job))];
      });
      return;
    }
  });

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
