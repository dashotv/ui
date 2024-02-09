import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import {
  EventPlexSessions,
  PlexCollectionChild,
  PlexPlayer,
  PlexPlayers,
  PlexSession,
  usePlexPlayMutation,
  usePlexStopMutation,
} from 'components/Plex';
import { PlexController } from 'components/Plex';
import { useSub } from 'hooks/sub';

import { Show } from './Item';
import './View.scss';
import { useCombinationQuery } from './query';

export const CombinationsView = () => {
  const { name } = useParams();
  if (!name) return null;
  const { data, isFetching } = useCombinationQuery(name);

  const [player, setPlayer] = useState<PlexPlayer | undefined>(undefined);

  const { mutate: plexPlay } = usePlexPlayMutation();
  const { mutate: plexStop } = usePlexStopMutation();

  const play = (show: PlexCollectionChild) => {
    if (!player || player.clientIdentifier === '') return;
    plexPlay({ player: player.clientIdentifier, ratingKey: show.next });
  };

  const stop = (sessionId: string) => {
    plexStop({ session: sessionId });
  };

  return (
    <>
      <Container>
        <PlexController {...{ player, setPlayer, stop }} />
      </Container>
      <Container>
        {isFetching && <LoadingIndicator />}
        <Grid container spacing={1}>
          {data?.map((child: PlexCollectionChild) => (
            <Grid key={child.key}>
              <Show show={child} play={play} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
