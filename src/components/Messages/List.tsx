import React, { useState } from 'react';

import { Message } from 'client/tower';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono, Row } from '@dashotv/components';

export function MessagesList({ data }: { data: Message[] }) {
  return (
    <Paper elevation={0}>
      {data.map((message: Message) => (
        <MessageRow key={message.id} {...message} />
      ))}
    </Paper>
  );
}

const Color = (level?: string) => {
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
const Name = (facility?: string) => {
  if (!facility) return 'unknown';
  const a = facility.split('::');
  return a[a.length - 1];
};
const LevelName = (level?: string) => {
  if (!level) return 'info';
  return level == 'warning' ? 'warn' : level;
};

export function MessageRow({ id, message, facility, level, created_at }: Message) {
  const [name] = useState<string | undefined>(Name(facility));
  const [levelName] = useState<string | undefined>(LevelName(level));
  const [color] = useState<string | undefined>(Color(level));

  return (
    <Row key={id}>
      <Stack direction={{ xs: 'column', md: 'row' }} width="100%" alignItems="center">
        <Typography width="100%" color={color} noWrap>
          {message}
        </Typography>
        <Stack
          minWidth="300px"
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
    </Row>
  );
}
