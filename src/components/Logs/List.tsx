import React from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono } from 'components/Common';

import { Log } from './types';

export function LogsList({ logs }: { logs: Log[] }) {
  return (
    <Paper elevation={0}>
      {logs.map((log: Log) => (
        <LogRow key={log.id} {...log} />
      ))}
    </Paper>
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
    <Paper key={id} elevation={1} sx={{ mb: 1, p: 1 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} width="100%" alignItems="center">
        <Typography width="100%" color={color(level)} noWrap>
          {message}
        </Typography>
        <Stack minWidth="225px" direction="row" spacing={1} alignItems="center" justifyContent="end">
          <Typography variant="button" color="secondary" noWrap maxWidth="100px">
            {name(facility)}
          </Typography>
          <Typography variant="button" color={color(level)} maxWidth="50px" noWrap>
            {levelName(level)}
          </Typography>
          <Typography variant="subtitle2" color="gray" noWrap>
            <Chrono fromNow>{created_at}</Chrono>
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
