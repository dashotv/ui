import React, { useEffect } from 'react';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Box, IconButton, LinearProgress, Stack, Typography } from '@mui/material';

import {
  PlexClient,
  PlexCollectionChild,
  PlexSession,
  usePlexPlayMutation,
  usePlexStopMutation,
} from 'components/Plex';

const hms = (seconds: number) => {
  return new Date(seconds).toISOString().substring(11, 19);
};

export const PlexControls = ({ player, session }: { player?: PlexClient; session?: PlexSession }) => {
  const [progress, setProgress] = React.useState<number>(0);
  const [current, setCurrent] = React.useState<string>('0:00');
  const [duration, setDuration] = React.useState<string>('0:00');
  const { mutate: plexPlay } = usePlexPlayMutation();
  const { mutate: plexStop } = usePlexStopMutation();

  const play = (show: PlexCollectionChild) => {
    if (!player || player.clientIdentifier === '') return;
    plexPlay({ player: player.clientIdentifier, ratingKey: show.next });
  };

  const stop = () => {
    if (!session) return;
    plexStop({ session: session.Session.id });
  };

  useEffect(() => {
    if (!session) {
      setProgress(0);
      setCurrent('0:00');
      setDuration('0:00');
      return;
    }
    setProgress((session.viewOffset / session.duration) * 100);
    setCurrent(hms(session.viewOffset));
    setDuration(hms(session.duration));
  }, [session]);

  return (
    <Stack direction="column" spacing={1} alignItems="baseline" width="100%">
      <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="center">
          <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="start">
            <Typography variant="caption" color="gray" sx={{ pt: 3 }}>
              {current}
            </Typography>
          </Stack>
          <IconButton onClick={() => stop()} disabled={true} size="medium">
            <SkipPreviousIcon fontSize="medium" />
          </IconButton>
          <IconButton onClick={() => stop()} disabled={!session} color="primary">
            <StopCircleIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => stop()} disabled={true} size="medium">
            <SkipNextIcon fontSize="medium" />
          </IconButton>
          <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="end">
            <Typography variant="caption" color="gray" sx={{ pt: 3 }}>
              {duration}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Stack>
  );
};
