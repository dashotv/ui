import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import Chrono from 'components/Chrono';
import { Job } from 'types/job';

export function JobsList({ jobs }) {
  return (
    <>
      <div className="releases">
        <table className="vertical-table">
          <thead>
            <tr>
              <td className="number"></td>
              <td>Title</td>
              <td className="actions" align="right">
                Processed
              </td>
            </tr>
          </thead>
          <tbody>{jobs && jobs.map(job => <JobRow key={job.id} {...job} />)}</tbody>
        </table>
      </div>
    </>
  );
}

export function JobRow({ id, name, processed_at, error }: Job) {
  return (
    <>
      <tr key={id}>
        <td title={error}>
          {error === '' ? (
            <CheckCircleIcon fontSize="small" color="success" />
          ) : (
            <ErrorIcon fontSize="small" color="error" />
          )}
        </td>
        <td>{name}</td>
        <td className="actions" align="right">
          <Chrono fromNow>{processed_at.toString()}</Chrono>
        </td>
      </tr>
    </>
  );
}
