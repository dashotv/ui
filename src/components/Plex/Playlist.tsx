import React, { useEffect, useState } from 'react';

import PlaylistAddCircle from '@mui/icons-material/PlaylistAddCircle';
import { Chip, IconButton, Paper, Stack, Typography } from '@mui/material';

import { Chrono, Row } from 'components/Common';
import { Container } from 'components/Layout';
import {
  EventPlexSessions,
  PlexChooser,
  PlexClient,
  PlexCollectionChild,
  PlexSession,
  usePlexPlayMutation,
  usePlexStopMutation,
} from 'components/Plex';
import { useSub } from 'hooks/sub';

import { PlexPlayerView } from './Player';

export const PlexPlaylist = ({ list }: { list: PlexCollectionChild[] }) => {
  const [player, setPlayer] = useState<PlexClient | undefined>(undefined);
  const [session, setSession] = useState<PlexSession | undefined>(undefined);
  const [sessions, setSessions] = useState<EventPlexSessions | undefined>(undefined);

  const { mutate: plexPlay } = usePlexPlayMutation();

  useEffect(() => {
    if (!sessions || !player) return;
    const found = sessions.sessions?.find(session => session.Player.machineIdentifier === player?.clientIdentifier);
    setSession(found);
  }, [sessions]);

  useSub('tower.plex_sessions', (data: EventPlexSessions) => setSessions(data));

  const play = (show: PlexCollectionChild) => {
    if (!player || player.clientIdentifier === '') return;
    plexPlay({ player: player.clientIdentifier, ratingKey: show.next });
  };

  if (!player) return <PlexChooser {...{ setPlayer }} />;

  return (
    <>
      <Container>
        <PlexPlayerView {...{ player, session }} />
      </Container>
      <Container>
        <PlexList {...{ list, play }} />
      </Container>
    </>
  );
};

const PlexList = ({ list, play }: { list: PlexCollectionChild[]; play: (show: PlexCollectionChild) => void }) => {
  return (
    <Paper elevation={1}>
      {list.map((show, i) => (
        <Row key={i}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%">
            <Stack direction="row" spacing={1} alignItems="center">
              <Unwatched viewed={show.viewed} total={show.total} />
              <Stack direction="column" spacing={0} width={{ xs: '165px', md: 'auto' }}>
                <Typography variant="body1" fontWeight="bolder" noWrap minWidth="35px" color="primary">
                  {show.title}
                </Typography>
                <ShowDate unix={show.lastViewedAt} />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" minWidth="125px" justifyContent="end">
              <Typography variant="caption" color="gray">
                {show.librarySectionTitle}
              </Typography>
              <IconButton onClick={() => play(show)}>
                <PlaylistAddCircle color="primary" />
              </IconButton>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Paper>
  );
};

const Unwatched = ({ viewed, total }: { viewed: string; total: string }) => {
  const v = Number(viewed);
  const t = Number(total);
  if (v === t) return null;
  const watched = t - v;
  return <Chip className="viewed" label={watched > 9 ? '+' : watched} />;
};

const ShowDate = ({ unix }: { unix: string }) => {
  if (!unix) return null;

  const string = new Date(Number(unix) * 1000).toString();
  return (
    <Typography variant="caption" color="gray">
      <Chrono fromNow>{string}</Chrono>
    </Typography>
  );
};
