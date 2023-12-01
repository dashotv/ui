import React, { useCallback, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import OutboundIcon from '@mui/icons-material/Outbound';
import PendingIcon from '@mui/icons-material/Pending';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ButtonMap, ButtonMapButton, Chrono } from 'components/Common';

import { useRequestsStatusMutation } from './query';
import { Request } from './types';

export function RequestsList({ requests }: { requests: Request[] }) {
  return (
    <Paper elevation={0}>
      {requests.map((request: Request) => (
        <RequestRow key={request.id} {...request} />
      ))}
    </Paper>
  );
}

export function RequestStatus({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon fontSize="small" color="success" />;
    case 'approved':
      return <CheckCircleIcon fontSize="small" color="secondary" />;
    case 'denied':
      return <CancelIcon fontSize="small" color="warning" />;
    case 'failed':
      return <ErrorIcon fontSize="small" color="error" />;
    default:
      return <PendingIcon fontSize="small" color="disabled" />;
  }
}

export function link({ source, source_id }: { source: string; source_id: string }) {
  switch (source) {
    case 'tmdb':
      return `http://themoviedb.org/movie/${source_id}`;
    // return (
    //   <Link href={`http://themoviedb.org/movie/${source_id}`} {...{ target, color, underline }}>
    //     {source}:{source_id}
    //   </Link>
    // );
    case 'tvdb':
      return `https://thetvdb.com/search?query=${source_id}`;
    // return (
    //   <Link href={`https://thetvdb.com/search?query=${source_id}`} {...{ target, color, underline }}>
    //     {source}:{source_id}
    //   </Link>
    // );
    default:
      return null;
  }
}

export function RequestRow(initial: Request) {
  const [request, setRequest] = useState<Request>(initial);
  const { id, title, user, source, source_id, status, created_at } = request;
  const mutation = useRequestsStatusMutation();
  const handleStatus = useCallback((s: string) => {
    const updated = { ...request, status: s };
    setRequest(updated);
    mutation.mutate(updated);
  }, []);

  const buttons: ButtonMapButton[] = [
    {
      title: 'View on site',
      Icon: OutboundIcon,
      color: 'primary',
      link: link({ source, source_id }) || '#',
    },
    {
      title: 'Approve',
      Icon: CheckCircleIcon,
      color: 'primary',
      click: () => handleStatus('approved'),
    },
    {
      title: 'Deny',
      Icon: CancelIcon,
      color: 'primary',
      click: () => handleStatus('denied'),
    },
  ];
  return (
    <Paper key={id} elevation={1} sx={{ mb: 1, p: 1 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} width="100%" alignItems="center">
        <Stack width="100%" direction="row" spacing={1} alignItems="center">
          <RequestStatus status={status} />
          <Typography variant="body1" color="primary" width="100%" noWrap>
            {title}
          </Typography>
        </Stack>
        <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="end">
          <Typography variant="subtitle2" color="secondary" noWrap>
            {user}
          </Typography>
          <Typography variant="subtitle2" color="gray" noWrap>
            <Chrono fromNow>{created_at}</Chrono>
          </Typography>
          <ButtonMap buttons={buttons} size="small" />
        </Stack>
      </Stack>
    </Paper>
  );
}
