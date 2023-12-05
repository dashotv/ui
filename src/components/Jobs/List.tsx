import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import { Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono } from 'components/Common';

import { JobsDialog } from './Dialog';
import { Job } from './types';

export function JobsList({ jobs }: { jobs: Job[] }) {
  const [selected, setSelected] = React.useState<Job | null>(null);
  const open = (job: Job) => {
    setSelected(job);
  };
  const close = () => {
    setSelected(null);
  };
  return (
    <Paper elevation={0}>
      {jobs.map(job => (
        <Link key={job.id} href="#" onClick={() => open(job)}>
          <JobRow {...job} />
        </Link>
      ))}
      {selected && <JobsDialog job={selected} close={close} />}
    </Paper>
  );
}
const Icon = ({ status }: { status: string }) => {
  switch (status) {
    case 'failed':
      return <ErrorIcon fontSize="small" color="error" />;
    case 'finished':
      return <CheckCircleIcon fontSize="small" color="success" />;
    default:
      return <PendingIcon fontSize="small" color="disabled" />;
  }
};
const Error = ({ error }: { error?: string }) => {
  if (!error) return null;
  return (
    <Typography variant="caption" color="error" minWidth="0" noWrap>
      {error}
    </Typography>
  );
};
const Title = ({ args }: { args: string }) => {
  if (args === '{}') return null;
  const parsed = JSON.parse(args);
  if (parsed && !parsed.Title) return null;
  return (
    <Typography variant="caption" color="gray" minWidth="0" noWrap>
      {parsed.Title}
    </Typography>
  );
};
const ErrorOrTitle = ({ error, args }: { error?: string; args: string }) => {
  if (error) return <Error error={error} />;
  return <Title args={args} />;
};

export function JobRow({ id, kind, status, args, attempts }: Job) {
  const { started_at, duration, error } = (attempts && attempts.length > 0 && attempts[attempts.length - 1]) || {};
  return (
    <Paper key={id} elevation={1} sx={{ mb: 1, p: 1 }}>
      <Stack width="100%" direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
        <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="start">
          <Icon status={status} />
          <Typography minWidth="0" color={status === 'failed' ? 'error' : 'primary'} noWrap>
            {kind}
          </Typography>
          <ErrorOrTitle {...{ error, args }} />
        </Stack>
        <Stack minWidth="150px" direction="row" spacing={1} alignItems="center" justifyContent="end">
          <Typography variant="caption" color="action">
            {duration ? `${duration.toFixed(1)}s` : ''}
          </Typography>
          <Typography minWidth="100px" variant="subtitle2" color="gray" noWrap>
            {started_at ? <Chrono fromNow>{started_at.toString()}</Chrono> : 'Pending'}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
