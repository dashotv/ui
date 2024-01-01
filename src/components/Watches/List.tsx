import React from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono, Row } from 'components/Common';

import { Watch } from './types';

export const WatchesList = ({ watches }: { watches: Watch[] }) => {
  return (
    <Paper elevation={0}>
      {watches.map(({ id, username, player, medium, watched_at }) => (
        <Row key={id}>
          <Stack width="100%" direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
            <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="start">
              <Typography minWidth="0" noWrap color="primary">
                {medium.title}
              </Typography>
              <Typography minWidth="0" noWrap color="primary.dark">
                {medium.display}
              </Typography>
            </Stack>
            <Stack minWidth="390px" direction="row" spacing={1} alignItems="center" justifyContent="end">
              <Typography title={username} noWrap variant="button" color="primary.dark">
                {username}
              </Typography>
              <Typography title={player} maxWidth="100px" noWrap variant="button" color="secondary.dark">
                {player}
              </Typography>
              <Typography maxWidth="125px" textAlign="right" variant="subtitle2" color="gray" noWrap>
                {watched_at ? <Chrono fromNow>{watched_at.toString()}</Chrono> : 'Pending'}
              </Typography>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Paper>
  );
};
