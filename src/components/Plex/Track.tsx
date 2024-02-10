import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { PlexClient, PlexSession } from 'components/Plex';

export const PlexTrack = ({ player, session }: { player?: PlexClient; session?: PlexSession }) => {
  return (
    <Stack direction="row" spacing={2}>
      <PlexTrackThumb thumb={session?.grandparentThumb || session?.thumb} />
      <Stack direction="column" spacing={0} alignItems="baseline">
        <PlexTrackTitle title={session?.title} />
        <PlexTrackInfo grandparentTitle={session?.grandparentTitle} parentTitle={session?.parentTitle} />
        <PlexTrackClient player={player} />
      </Stack>
    </Stack>
  );
};

const PlexTrackThumb = ({ thumb }: { thumb?: string }) => {
  const url = thumb ? `/thumbs${thumb}` : `/blank.png`;
  return (
    <Box
      sx={{
        width: '67px',
        height: '67px',
        backgroundColor: '#242424',
        '& > img:before': {
          content: "' '",
          display: 'block',
          position: 'absolute',
          height: '65px',
          width: '65px',
          backgroundImage: 'url(/blank.png)',
          border: '1px solid #242424',
        },
        '& > img': {
          objectFit: 'cover',
        },
      }}
    >
      <img src={url} alt="" width="65" height="65" />
    </Box>
  );
};

const PlexTrackClient = ({ player }: { player?: PlexClient }) => {
  return (
    <Typography variant="caption" noWrap minWidth="35px" color="primary.dark">
      {player?.name || 'client...'}
    </Typography>
  );
};

const PlexTrackTitle = ({ title }: { title?: string }) => {
  return (
    <Typography variant="body1" fontWeight="bolder" noWrap minWidth="35px" color={title ? 'primary' : 'gray'}>
      {title || 'Title'}
    </Typography>
  );
};

const PlexTrackInfo = ({ grandparentTitle, parentTitle }: { grandparentTitle?: string; parentTitle?: string }) => {
  return (
    <Typography variant="caption" noWrap minWidth="35px" color="gray">
      {grandparentTitle && parentTitle ? `${grandparentTitle} - ${parentTitle}` : 'series/movie'}
    </Typography>
  );
};
