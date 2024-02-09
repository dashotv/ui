import React, { useCallback, useEffect, useState } from 'react';
import { set } from 'react-hook-form';

import StopCircleIcon from '@mui/icons-material/StopCircle';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { EventPlexSessions, PlexPlayer, PlexSession } from 'components/Plex';
import { useSub } from 'hooks/sub';

import { usePlexPlayers } from './query';

export const PlexController = ({
  player,
  setPlayer,
  stop,
}: {
  player?: PlexPlayer;
  setPlayer: (v?: PlexPlayer) => void;
  stop: (v: string) => void;
}) => {
  const [session, setSession] = useState<PlexSession | undefined>(undefined);
  const [sessions, setSessions] = useState<EventPlexSessions | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const stopSession = () => {
    if (!session) return;
    stop(session.Session.id);
  };

  useEffect(() => {
    if (!session) {
      setTitle('');
      setProgress(0);
      return;
    }

    const title = [session.grandparentTitle, session.parentTitle, session.title].filter(n => n).join(' - ');
    setTitle(title);
    setProgress(session.viewOffset / session.duration);
  }, [player, session]);

  useEffect(() => {
    if (!sessions || !player) return;
    const found = sessions.sessions.find(session => session.Player.machineIdentifier === player?.clientIdentifier);
    setSession(found);
  }, [sessions]);

  useSub('tower.plex_sessions', (data: EventPlexSessions) => setSessions(data));

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
      <PlayerSelect {...{ player, setPlayer }} />
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton onClick={stopSession} disabled={!session} size="small">
          <StopCircleIcon fontSize="small" />
        </IconButton>
        <PlayerProgress title={title} progress={progress} />
      </Stack>
    </Stack>
  );
};

const PlayerProgress = ({ title, progress }: { title: string; progress: number }) => {
  return (
    <Stack direction="column" spacing={1} alignItems="baseline" width="100%">
      <Typography variant="body1" noWrap minWidth="35px">
        {title || 'Nothing Playing...'}
      </Typography>
      <Box sx={{ width: '200px' }}>
        <LinearProgress variant="determinate" value={progress * 100} />
      </Box>
    </Stack>
  );
};

const PlayerSelect = ({
  player,
  setPlayer,
}: {
  player?: PlexPlayer;
  setPlayer: (v: PlexPlayer | undefined) => void;
}) => {
  const { isFetching, data: players } = usePlexPlayers();
  const [open, setOpen] = useState(false);

  const handleChoose = (player?: PlexPlayer) => {
    setPlayer(player);
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          whiteSpace: 'nowrap',
          minWidth: '75px',
          maxWidth: '125px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        fullWidth
      >
        {player ? player.name : 'Player...'}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select a player</DialogTitle>
        <DialogContent>
          {isFetching && <Typography>Loading...</Typography>}
          <List sx={{ pt: 0 }}>
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleChoose(undefined)}>
                <ListItemText primary="None" />
              </ListItemButton>
            </ListItem>
            {players?.map(c => (
              <ListItem disableGutters key={c.clientIdentifier}>
                <ListItemButton onClick={() => handleChoose(c)}>
                  <ListItemText primary={c.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};
