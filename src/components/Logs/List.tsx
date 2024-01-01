import React, { useState } from 'react';

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

const Color = (level: string) => {
  switch (level) {
    case 'debug':
      return 'gray';
    case 'info':
      return 'info.main';
    case 'warn':
    case 'warning':
      return 'warning.main';
    case 'error':
      return 'error.main';
    case 'success':
      return 'success.main';
    default:
      return 'inherit';
  }
};
const Name = (facility: string) => {
  const a = facility.split('::');
  return a[a.length - 1];
};
const LevelName = (level: string) => {
  return level == 'warning' ? 'warn' : level;
};

export function LogRow({ id, message, facility, level, created_at }: Log) {
  const [name] = useState<string | undefined>(Name(facility));
  const [levelName] = useState<string | undefined>(LevelName(level));
  const [color] = useState<string | undefined>(Color(level));

  return (
    <Paper key={id} elevation={1} sx={{ mb: 1, p: 1 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} width="100%" alignItems="center">
        <Typography width="100%" color={color} noWrap>
          {message}
        </Typography>
        <Stack
          minWidth="250px"
          width={{ xs: '100%', md: 'auto' }}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="end"
        >
          <Typography title={name} variant="button" color="secondary" noWrap textAlign="right">
            {name}
          </Typography>
          <Typography variant="button" color={color} maxWidth="75px" noWrap textAlign="right">
            {levelName}
          </Typography>
          <Typography variant="subtitle2" color="gray" noWrap textAlign="right">
            <Chrono fromNow>{created_at}</Chrono>
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
