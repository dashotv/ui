import React, { useEffect, useState } from 'react';

import { CombinationChild } from 'client/tower';
import { useInterval } from 'usehooks-ts';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Chip, IconButton, Paper, Stack, Typography } from '@mui/material';

import { Chrono, Row } from '@dashotv/components';

import { Container } from 'components/Common';
import { EventPlexSessions, PlexChooser, PlexClient, PlexSession, usePlexPlayMutation } from 'components/Plex';
import { useSub } from 'hooks/sub';

import { PlexPlayerView } from './Player';

export const PlexPlaylist = ({ list }: { list: CombinationChild[] }) => {
  const [player, setPlayer] = useState<PlexClient | undefined>(undefined);
  const [session, setSession] = useState<PlexSession | undefined>(undefined);
  const [sessions, setSessions] = useState<EventPlexSessions | undefined>(undefined);
  const [playing, setPlaying] = useState<string>('');

  const { mutate: plexPlay } = usePlexPlayMutation();
  useSub('tower.plex_sessions', (data: EventPlexSessions) => setSessions(data));

  useEffect(() => {
    if (!sessions || !player) return;
    const found = sessions.sessions?.find(session => session.Player.machineIdentifier === player?.clientIdentifier);
    setSession(found);
  }, [sessions]);

  useEffect(() => {
    setPlaying(session?.ratingKey || '');
  }, [session]);

  const play = (show: CombinationChild) => {
    if (!player || player.clientIdentifier === '' || !show.next) return;
    plexPlay({ player: player.clientIdentifier, ratingKey: show.next });
  };

  if (!player) return <PlexChooser {...{ setPlayer }} />;

  return (
    <>
      <Container>
        <PlexPlayerView {...{ player, session }} />
      </Container>
      <Container>
        <PlexList {...{ list, play, playing }} />
      </Container>
    </>
  );
};

const PlexList = ({
  list,
  playing,
  play,
}: {
  list: CombinationChild[];
  playing: string;
  play: (show: CombinationChild) => void;
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [delay, setDelay] = useState<number | null>(null);
  const delaySeconds = 60;

  useInterval(() => {
    console.log('interval');
    setDisabled(false);
    setDelay(null);
  }, delay);

  useEffect(() => {
    setDelay(0);
  }, [playing]);

  const handlePlay = (show: CombinationChild) => {
    console.log('handlePlay');
    play(show);
    setDisabled(true);
    setDelay(delaySeconds * 1000);
  };

  return (
    <Paper elevation={1}>
      {list.map((show, i) => (
        <Row key={i} variant={show.next !== '' && playing === show.next ? 'success' : 'default'}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%">
            <Stack direction="row" spacing={1} alignItems="center">
              <Unwatched viewed={show.viewed} total={show.total} />
              <Stack direction="column" spacing={0} width={{ xs: '165px', md: 'auto' }}>
                <Typography variant="body1" fontWeight="bolder" noWrap minWidth="35px" maxWidth="700px" color="primary">
                  {show.title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="baseline">
                  <ShowDateLabel label="viewed" unix={show.last_viewed_at} />
                  <ShowDateLabel label="added" unix={show.added_at} />
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" minWidth="125px" justifyContent="end">
              <Typography variant="caption" color="gray">
                {show.library_title}
              </Typography>
              <IconButton onClick={() => handlePlay(show)} disabled={disabled}>
                <PlayCircleIcon color={disabled ? 'disabled' : 'primary'} />
              </IconButton>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Paper>
  );
};

const Unwatched = ({ viewed, total }: { viewed?: number; total?: number }) => {
  if (!viewed || !total || viewed === total) return <Chip className="viewed" label={0} />;
  const watched = total - viewed;
  return <Chip className="viewed" color="primary" label={watched > 9 ? '+' : watched} />;
};

const ShowDateLabel = ({ label, unix }: { label: string; unix?: number }) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Typography variant="caption" color="primary.dark">
        {label}
      </Typography>
      <ShowDate unix={unix} />
    </Stack>
  );
};

const ShowDate = ({ unix }: { unix?: number }) => {
  if (!unix)
    return (
      <Typography variant="caption" color="gray">
        unknown
      </Typography>
    );

  const string = new Date(Number(unix) * 1000).toString();
  return (
    <Typography variant="caption" color="gray">
      <Chrono fromNow>{string}</Chrono>
    </Typography>
  );
};
