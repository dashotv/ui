import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono } from 'components/Common';

import { Job } from './types';

export function JobsList({ jobs }: { jobs: Job[] }) {
  return (
    <Paper elevation={0}>
      {jobs.map(job => (
        <JobRow key={job.id} {...job} />
      ))}
    </Paper>
  );
}

export function JobRow({ id, kind, status, attempts }: Job) {
  const { started_at, duration, error } = attempts[attempts.length - 1];
  return (
    <Paper key={id} elevation={1} sx={{ mb: 1, p: 1 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} width="100%" alignItems="center">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="start"
          width={{ xs: '100%', md: 'auto' }}
        >
          {status === 'failed' ? (
            <ErrorIcon fontSize="small" color="error" />
          ) : (
            <CheckCircleIcon fontSize="small" color="success" />
          )}
          <Typography minWidth="0" width="100%" color={status === 'failed' ? 'error' : 'primary'} noWrap>
            {kind}
          </Typography>
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </Stack>
        <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="end">
          <Typography variant="caption" color="action">
            {duration.toFixed(1)}s
          </Typography>
          <Typography minWidth="100px" variant="subtitle2" color="gray" noWrap>
            {started_at ? <Chrono fromNow>{started_at.toString()}</Chrono> : 'Pending'}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
