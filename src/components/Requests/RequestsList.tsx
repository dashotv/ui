import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Link from '@mui/material/Link';

import Chrono from 'components/Chrono';
import { Request } from 'types/request';

export function RequestsList({ requests }) {
  return (
    <>
      <div className="releases">
        <table className="vertical-table">
          <thead>
            <tr>
              <td className="number"></td>
              <td className="actions">User</td>
              <td>Title</td>
              <td className="actions">Source</td>
              <td className="actions" align="right">
                Created
              </td>
            </tr>
          </thead>
          <tbody>{requests && requests.map(request => <RequestRow key={request.id} {...request} />)}</tbody>
        </table>
      </div>
    </>
  );
}

export function RequestRow({ id, title, user, source, source_id, created_at, updated_at }: Request) {
  return (
    <>
      <tr key={id}>
        <td>
          <CheckCircleIcon fontSize="small" color="success" />
        </td>
        <td className="actions">{user}</td>
        <td>{title}</td>
        <td className="actions">
          <Link color="primary" underline="none">
            {source}:{source_id}
          </Link>
        </td>
        <td className="actions" align="right">
          <Chrono fromNow>{created_at.toString()}</Chrono>
        </td>
      </tr>
    </>
  );
}
