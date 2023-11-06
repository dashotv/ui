import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import Chrono from 'components/Chrono';
import { useSubscription } from 'components/Nats/useSubscription';
import { Log } from 'types/log';

export function LogsList({ logs, page }: { logs: Log[]; page: number }) {
  const queryClient = useQueryClient();
  useSubscription('tower.logs', () => {
    queryClient.invalidateQueries({ queryKey: ['logs', page] });
  });
  return (
    <>
      <div className="logs">
        <table className="vertical-table">
          <thead>
            <tr>
              <td className="actions">Time</td>
              <td className="small">Facility</td>
              <td className="smaller">Level</td>
              <td>Message</td>
            </tr>
          </thead>
          <tbody>{logs && logs.map((log: Log) => <LogRow key={log.id} {...log} />)}</tbody>
        </table>
      </div>
    </>
  );
}

export function LogRow({ id, message, facility, level, created_at }: Log) {
  return (
    <>
      <tr key={id}>
        <td>
          <Chrono fromNow>{created_at}</Chrono>
        </td>
        <td>{facility}</td>
        <td>{level}</td>
        <td>{message}</td>
      </tr>
    </>
  );
}
