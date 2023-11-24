import React from 'react';

import { Typography } from '@mui/material';

import { Chrono } from 'components/Common';

import { Log } from './types';

export function LogsList({ logs }: { logs: Log[] }) {
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
  const name = (facility: string) => {
    const a = facility.split('::');
    return a[a.length - 1];
  };
  const levelName = (level: string) => {
    return level == 'warning' ? 'warn' : level;
  };
  const color = (level: string) => {
    switch (level) {
      case 'debug':
        return 'gray';
      case 'info':
        return 'info.main';
      case 'warn':
        return 'warning.main';
      case 'warning':
        return 'warning.main';
      case 'error':
        return 'error.main';
      default:
        return 'inherit';
    }
  };
  return (
    <>
      <tr key={id}>
        <td title={created_at}>
          <Typography color="gray" noWrap>
            <Chrono fromNow>{created_at}</Chrono>
          </Typography>
        </td>
        <td title={facility}>
          <Typography variant="button" color="secondary" noWrap>
            {name(facility)}
          </Typography>
        </td>
        <td title={level}>
          <Typography variant="button" color={color(level)}>
            {levelName(level)}
          </Typography>
        </td>
        <td className="truncate">
          <Typography color={color(level)}>{message}</Typography>
        </td>
      </tr>
    </>
  );
}
