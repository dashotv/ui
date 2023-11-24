import React, { useCallback, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import { Chrono } from 'components/Common';

import { useRequestsStatusMutation } from './query';
import { Request } from './types';

export function RequestsList({ requests }: { requests: Request[] }) {
  return (
    <>
      <div className="releases">
        <table className="vertical-table">
          <thead>
            <tr>
              <td className="number"></td>
              <td>Title</td>
              <td className="actions">Source</td>
              <td className="small">Requested</td>
              <td className="date" align="right">
                Created
              </td>
              <td className="small" align="right">
                Actions
              </td>
            </tr>
          </thead>
          <tbody>{requests && requests.map((request: Request) => <RequestRow key={request.id} {...request} />)}</tbody>
        </table>
      </div>
    </>
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
      return <PendingIcon fontSize="small" color="secondary" />;
  }
}

export function RequestLink({
  source,
  source_id,
  target,
  color,
  underline,
}: {
  source: string;
  source_id: string;
  target: string;
  color: string;
  underline?: 'none' | 'always' | 'hover';
}) {
  switch (source) {
    case 'tmdb':
      return (
        <Link href={`http://themoviedb.org/movie/${source_id}`} {...{ target, color, underline }}>
          {source}:{source_id}
        </Link>
      );
    case 'tvdb':
      return (
        <Link href={`https://thetvdb.com/search?query=${source_id}`} {...{ target, color, underline }}>
          {source}:{source_id}
        </Link>
      );
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
  return (
    <>
      <tr key={id}>
        <td>
          <RequestStatus status={status} />
        </td>
        <td className="truncate">{title}</td>
        <td>
          <RequestLink {...{ source, source_id }} target="_window" color="primary" underline="none" />
        </td>
        <td>{user}</td>
        <td align="right">
          <Chrono fromNow>{created_at.toString()}</Chrono>
        </td>
        <td align="right">
          <IconButton aria-label="delete" size="small" onClick={() => handleStatus('approved')}>
            <CheckCircleIcon fontSize="small" color="primary" />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => handleStatus('denied')}>
            <CancelIcon fontSize="small" color="primary" />
          </IconButton>
        </td>
      </tr>
    </>
  );
}
