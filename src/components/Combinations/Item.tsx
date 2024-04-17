import React from 'react';

import { Box, Chip, Link } from '@mui/material';

import { Chrono } from '@dashotv/components';

import { PlexCollectionChild } from 'components/Plex';

export const Show = ({ show, play }: { show: PlexCollectionChild; play: (show: PlexCollectionChild) => void }) => {
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
