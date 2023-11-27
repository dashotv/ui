import React, { useEffect, useState } from 'react';

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
  const [name, setName] = useState<string | undefined>(undefined);
  const [levelName, setLevelName] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const a = facility.split('::');
    setName(a[a.length - 1]);
    setLevelName(level == 'warning' ? 'warn' : level);
    switch (level) {
      case 'debug':
        setColor('gray');
        break;
      case 'info':
        setColor('info.main');
        break;
      case 'warn':
      case 'warning':
        setColor('warning.main');
        break;
      case 'error':
        setColor('error.main');
        break;
      default:
        setColor('inherit');
        break;
    }
  }, [facility, level]);

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
          <Typography title={name} variant="button" color="secondary" noWrap maxWidth="100px">
            {name}
          </Typography>
          <Typography variant="button" color={color} maxWidth="50px" noWrap>
            {levelName}
          </Typography>
          <Typography variant="subtitle2" color="gray" noWrap>
            <Chrono fromNow>{created_at}</Chrono>
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
