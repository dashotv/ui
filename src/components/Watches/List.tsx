import React from 'react';

import { Watch } from 'client/tower';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono, Row } from '@dashotv/components';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {useWatchesDeleteMutation} from './query'
import { useQueryClient } from '@tanstack/react-query';

export const WatchesList = ({ watches }: { watches?: Watch[] }) => {
  const deleter = useWatchesDeleteMutation();
  const queryClient = useQueryClient();

  const deleteWatch = (id: string) => {
    deleter.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['watches']});
        // queryClient.setQueryData(['watches'], (old: any) => old.filter((watch: Watch) => watch.id !== id));
      },
    })
  }
  return (
    <Paper elevation={0}>
      {watches?.map(({ id, username, player, medium, watched_at }) => (
        <Row key={id}>
          <Stack
            width="100%"
            direction={{ xs: 'column', md: 'row' }}
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="start">
              <Typography minWidth="0" maxWidth="200px" noWrap color="primary">
                {medium?.title}
              </Typography>
              <Typography minWidth="0" maxWidth="200px" noWrap color="primary.dark">
                {medium?.display}
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
              <IconButton size="small" color="primary" onClick={() => id && deleteWatch(id)}>
                <DeleteForeverIcon fontSize='small' color='error' />
              </IconButton>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Paper>
  );
};
