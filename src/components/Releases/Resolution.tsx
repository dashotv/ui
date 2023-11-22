import React from 'react';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { Pill } from 'components/Pill';

export type ResolutionProps = {
  resolution: string | number | undefined;
  variant?: 'default' | 'chip' | 'pill';
};
export const Resolution = ({ resolution, variant }: ResolutionProps) => {
  if (!resolution) {
    return;
  }

  switch (variant) {
    case 'chip':
      return <Chip label={resolution} size="small" color="primary" />;
    case 'pill':
      return <Pill name="R" value={resolution} color="primary.dark" />;
    default:
      return (
        <Typography variant="button" color="primary.dark">
          {resolution}p
        </Typography>
      );
  }
};
