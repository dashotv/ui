import React from 'react';

import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

import { PlexClient, PlexSession } from 'components/Plex';

import { PlexControls } from './Controls';
import { PlexTrack } from './Track';

export const PlexPlayerView = ({ player, session }: { player?: PlexClient; session?: PlexSession }) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={12} md={8}>
        <PlexTrack {...{ player, session }} />
      </Grid>
      <Grid xs={12} md={4}>
        <Stack direction="row" spacing={1} alignItems="center">
          <PlexControls {...{ player, session }} />
        </Stack>
      </Grid>
    </Grid>
  );
};
