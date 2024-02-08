import React from 'react';
import { useParams } from 'react-router-dom';

import { Box, Chip, Link } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { Chrono, LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { Players, PlexCollectionChild, usePlexPlayMutation } from 'components/Plex';

import './View.scss';
import { useCombinationQuery } from './query';

const Show = ({ show, play }: { show: PlexCollectionChild; play: (show: PlexCollectionChild) => void }) => {
  return (
    <Link onClick={() => play(show)} sx={{ cursor: 'pointer' }}>
      <Box className="show">
        <Box className="backdrop"></Box>
        <img src={show.thumb} alt="thumbnail" />
        <Box className="title">{show.title}</Box>
        <Box className="type">{show.librarySectionTitle}</Box>
        <Unwatched viewed={show.viewed} total={show.total} />
        <ShowDate unix={show.lastViewedAt} />
      </Box>
    </Link>
  );
};
const Unwatched = ({ viewed, total }: { viewed: string; total: string }) => {
  const v = Number(viewed);
  const t = Number(total);
  if (v === t) return null;
  const watched = t - v;
  return <Chip className="viewed" label={watched > 9 ? '+' : watched} size="small" color="primary" />;
};
const ShowDate = ({ unix }: { unix: string }) => {
  if (!unix) return null;

  const string = new Date(Number(unix) * 1000).toString();
  return (
    <div className="date">
      <Chrono fromNow>{string}</Chrono>
    </div>
  );
};
export const CombinationsView = () => {
  const { name } = useParams();
  if (!name) return null;

  const { data, isFetching } = useCombinationQuery(name);
  const [player, setPlayer] = React.useState('');
  const { mutate: playMutation } = usePlexPlayMutation();

  const play = (show: PlexCollectionChild) => {
    if (player === '') return;
    playMutation({ ratingKey: show.next, player });
  };

  return (
    <>
      <Container>
        <Players {...{ player, setPlayer }} />
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
