import React from 'react';

import { Box, Link } from '@mui/material';

import { Chrono, LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';

import './List.scss';
import { Players } from './Players';
import { usePlexPlayMutation, usePlexStuff } from './query';
import { Child } from './types';

const Show = ({ show, play }: { show: Child; play: (show: Child) => void }) => {
  return (
    <Link onClick={() => play(show)} sx={{ cursor: 'pointer' }}>
      <Box className="show">
        <Box className="backdrop"></Box>
        <img src={show.thumb} alt="thumbnail" />
        <Box className="title">{show.title}</Box>
        <Box className="type">{show.librarySectionTitle}</Box>
        <Box className="viewed">
          {show.viewed}/{show.total}
        </Box>
        <ShowDate unix={show.lastViewedAt} />
      </Box>
    </Link>
  );
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
export const Stuff = () => {
  const { data, isFetching } = usePlexStuff();
  const [player, setPlayer] = React.useState('');
  const { mutate: playMutation } = usePlexPlayMutation();

  const play = (show: Child) => {
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
        {data?.map((child: Child) => <Show key={child.key} show={child} play={play} />)}
      </Container>
    </>
  );
};
