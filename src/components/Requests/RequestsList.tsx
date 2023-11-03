import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import Link from '@mui/material/Link';

import Chrono from 'components/Chrono';
import { Request } from 'types/request';

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
              <td className="actions">Requested By</td>
              <td className="actions" align="right">
                Created
              </td>
            </tr>
          </thead>
          <tbody>{requests && requests.map((request: Request) => <RequestRow key={request.id} {...request} />)}</tbody>
        </table>
      </div>
    </>
  );
}

export function RequestStatus({ status }) {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon fontSize="small" color="success" />;
    case 'failed':
      return <ErrorIcon fontSize="small" color="error" />;
    default:
      return <PendingIcon fontSize="small" color="secondary" />;
  }
}

export function RequestLink({ source, source_id, target, color, underline }) {
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

export function RequestRow({ id, title, user, source, source_id, status, created_at, updated_at }: Request) {
  return (
    <>
      <tr key={id}>
        <td>
          <RequestStatus status={status} />
        </td>
        <td>{title}</td>
        <td className="actions">
          <RequestLink {...{ source, source_id }} target="_window" color="primary" underline="none" />
        </td>
        <td className="actions">{user}</td>
        <td className="actions" align="right">
          <Chrono fromNow>{created_at.toString()}</Chrono>
        </td>
      </tr>
    </>
  );
}
