import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { Chrono } from 'components/Common';

import { Job } from './types';

export function JobsList({ jobs }: { jobs: Job[] }) {
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
          {processed_at ? <Chrono fromNow>{processed_at.toString()}</Chrono> : 'Pending'}
        </td>
      </tr>
    </>
  );
}
