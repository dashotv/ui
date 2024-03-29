import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import BlockIcon from '@mui/icons-material/Block';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import { Grid, IconButton, Stack } from '@mui/material';

import { WrapErrorBoundary } from 'components/Common';
import { JobsList, JobsStats, deleteJob } from 'components/Jobs';
import { Container } from 'components/Layout';

// const services = [
//   { name: 'Tower', type: 'tower' },
//   { name: 'Runic', type: 'runic' },
//   { name: 'Flame', type: 'flame' },
// ];

export default function JobsPage() {
  const [page] = useState(1);

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
          <Grid container spacing={0} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6} justifyContent="end">
              <Stack direction="row" spacing={0} justifyContent="end" alignItems="center">
                <IconButton title="Cancel Pending" onClick={() => handleCancel('pending')}>
                  <PendingIcon color="disabled" />
                </IconButton>
                <IconButton title="Clear Cancelled" onClick={() => handleClear('cancelled')}>
                  <BlockIcon color="warning" />
                </IconButton>
                <IconButton title="Clear Failed" onClick={() => handleClear('failed')}>
                  <ErrorIcon color="error" />
                </IconButton>
                <JobsStats />
              </Stack>
            </Grid>
          </Grid>
          <JobsList {...{ page, handleCancel }} />
        </WrapErrorBoundary>
      </Container>
    </>
  );
}
