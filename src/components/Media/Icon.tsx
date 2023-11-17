import React from 'react';

import HelpIcon from '@mui/icons-material/Help';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';

export const MediaIcon = ({ type }: { type?: string }) => {
  switch (type) {
    case 'series':
      return <TvIcon sx={{ pt: '2px' }} color="primary" fontSize="small" />;
    case 'movie':
      return <TheatersIcon sx={{ pt: '2px' }} color="primary" fontSize="small" />;
    default:
      return <HelpIcon sx={{ pt: '2px' }} color="primary" fontSize="small" />;
  }
};
