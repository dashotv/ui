import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import BlockIcon from '@mui/icons-material/Block';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import { Grid, IconButton, Stack } from '@mui/material';

import { useQueryClient } from '@tanstack/react-query';

import { LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { Job, JobsList, JobsStats, deleteJob, useJobsQuery } from 'components/Jobs';
import { Container } from 'components/Layout';
import { useSub } from 'hooks/sub';
import { EventJob, EventStats } from 'types/events';

export default function JobsPage() {
  const [page] = useState(1);
  const [stats, setStats] = useState({});
  const jobs = useJobsQuery(page);
  const queryClient = useQueryClient();

  useSub('tower.jobs', (data: EventJob) => {
    // console.log('tower.jobs');
    if (data.event === 'created') {
      console.log('job created', data.job);
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

  useSub('tower.stats', (data: EventStats) => {
    setStats(data);
  });

  const handleCancel = (id: string) => {
    console.log('cancel', id);
    deleteJob(id, false);
  };
  const handleClear = (id: string) => {
    console.log('clear', id);
    deleteJob(id, true);
  };

  return (
    <>
      <Helmet>
        <title>Home - Jobs</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <WrapErrorBoundary>
          {jobs.isFetching && <LoadingIndicator />}
          <Grid container spacing={0} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={0} justifyContent="start">
                <IconButton title="Cancel Pending" onClick={() => handleCancel('pending')}>
                  <PendingIcon color="disabled" />
                </IconButton>
                <IconButton title="Clear Cancelled" onClick={() => handleClear('cancelled')}>
                  <BlockIcon color="warning" />
                </IconButton>
                <IconButton title="Clear Failed" onClick={() => handleClear('failed')}>
                  <ErrorIcon color="error" />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} justifyContent="end">
              {stats && <JobsStats stats={stats} />}
            </Grid>
          </Grid>
          {jobs.data && <JobsList jobs={jobs.data} />}
        </WrapErrorBoundary>
      </Container>
    </>
  );
}
