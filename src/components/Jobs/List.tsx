import React from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BlockIcon from '@mui/icons-material/Block';
import CachedIcon from '@mui/icons-material/Cached';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import { Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useQueryClient } from '@tanstack/react-query';

import { ButtonMap, ButtonMapButton, Chrono, LoadingIndicator, Row } from 'components/Common';
import { Job, useJobsQuery } from 'components/Jobs';
import { useSub } from 'hooks/sub';
import { EventJob } from 'types/events';

import { JobsDialog } from './Dialog';

export function JobsList({
  page,
  handleCancel,
  runningOnly,
  limit = 250,
}: {
  page: number;
  runningOnly?: boolean;
  limit?: number;
  handleCancel: (id: string) => void;
}) {
  const jobs = useJobsQuery(page);
  const [selected, setSelected] = React.useState<Job | null>(null);
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
  const open = (job: Job) => {
    setSelected(job);
  };
  const close = () => {
    setSelected(null);
  };
  return (
    <Paper elevation={0}>
      {jobs.isFetching && <LoadingIndicator />}
      <Paper elevation={0}>
        {jobs.data?.map(job => {
          if (job.status !== 'failed' && job.status !== 'finished' && job.status !== 'pending') {
            return (
              <Link key={job.id} href="#" onClick={() => open(job)}>
                <JobRow {...{ job, handleCancel }} />
              </Link>
            );
          }
        })}
      </Paper>

      {!runningOnly && (
        <Paper elevation={0}>
          {jobs.data?.slice(0, limit).map(job => {
            if (job.status === 'failed' || job.status === 'finished') {
              return (
                <Link key={job.id} href="#" onClick={() => open(job)}>
                  <JobRow {...{ job, handleCancel }} />
                </Link>
              );
            }
          })}
        </Paper>
      )}
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
    case 'queued':
      return <AccessTimeIcon fontSize="small" color="secondary" />;
    case 'running':
      return <CachedIcon fontSize="small" color="primary" />;
    case 'cancelled':
      return <BlockIcon fontSize="small" color="warning" />;
    default:
      return <PendingIcon fontSize="small" color="disabled" />;
  }
};
const Error = ({ error }: { error?: string }) => {
  if (!error) return null;
  return (
    <Typography variant="caption" color="error" minWidth="0" width={{ xs: '100%', md: 'auto' }} noWrap>
      {error}
    </Typography>
  );
};
const Title = ({ args }: { args: string }) => {
  if (args === '{}') return null;
  const parsed = JSON.parse(args);
  if (!parsed || !parsed.Title) return null;
  return (
    <Typography variant="caption" color="gray" minWidth="0" width={{ xs: '100%', md: 'auto' }} noWrap>
      {parsed.Title}
    </Typography>
  );
};
const ErrorOrTitle = ({ error, args }: { error?: string; args: string }) => {
  if (error) return <Error error={error} />;
  return <Title args={args} />;
};

export function JobRow({
  job: { id, kind, queue, status, args, attempts },
  handleCancel,
}: {
  job: Job;
  handleCancel: (id: string) => void;
}) {
  const { started_at, duration, error } = (attempts && attempts.length > 0 && attempts[attempts.length - 1]) || {};

  const buttons: ButtonMapButton[] = [
    {
      Icon: BlockIcon,
      color: 'warning',
      click: e => {
        e.preventDefault();
        e.stopPropagation();
        handleCancel(id);
      },
      title: 'cancel',
    },
  ];
  return (
    <Row key={id}>
      <Stack width="100%" direction={{ xs: 'column', md: 'row' }} alignItems="center">
        <Stack
          width="100%"
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          alignItems="center"
          justifyContent="start"
        >
          <Stack
            width={{ xs: '100%', md: 'auto' }}
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="start"
          >
            <Icon status={status} />
            <Typography minWidth="0" color={status === 'failed' ? 'error' : 'primary'} noWrap>
              {kind}
            </Typography>
          </Stack>
          <ErrorOrTitle {...{ error, args }} />
        </Stack>
        <Stack
          minWidth="300px"
          width={{ xs: '100%', md: 'auto' }}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="end"
        >
          <Typography noWrap variant="button" color="primary.dark">
            {queue}
          </Typography>
          <Typography noWrap fontWeight="bolder" color="action">
            {duration ? `${duration.toFixed(1)}s` : ''}
          </Typography>
          <Typography variant="subtitle2" color="gray" noWrap>
            {started_at ? <Chrono fromNow>{started_at.toString()}</Chrono> : ''}
          </Typography>
          <ButtonMap size="small" buttons={buttons} />
        </Stack>
      </Stack>
    </Row>
  );
}
