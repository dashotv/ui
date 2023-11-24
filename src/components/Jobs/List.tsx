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

export function JobRow({ id, name, processed_at, error }: Job) {
  return (
    <Paper key={id} elevation={1} sx={{ mb: 1, p: 1 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} width="100%" alignItems="center">
        {error === '' ? (
          <CheckCircleIcon fontSize="small" color="success" />
        ) : (
          <ErrorIcon fontSize="small" color="error" />
        )}
        <Typography width="100%" color={error === '' ? 'primary' : 'error'} noWrap>
          {name}
        </Typography>
        <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="end">
          <Typography variant="subtitle2" color="gray" noWrap>
            {processed_at ? <Chrono fromNow>{processed_at.toString()}</Chrono> : 'Pending'}
          </Typography>
        </Stack>
      </Stack>
      {/* <tr key={id}>
        <td title={error}>
          {error === '' ? (
            <CheckCircleIcon fontSize="small" color="success" />
          ) : (
            <ErrorIcon fontSize="small" color="error" />
          )}
        </td>
        <td>{name}</td>
        <td className="actions" align="right">
          {processed_at ? <Chrono fromNow>{processed_at.toString()}</Chrono> : 'Pending'}
        </td>
      </tr> */}
    </Paper>
  );
}
