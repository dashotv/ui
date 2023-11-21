import React, { useCallback } from 'react';

import Typography from '@mui/material/Typography';

export const useReleaseResolution = () => {
  const resolution = useCallback(r => {
    if (r) {
      // return <Chip label={r} size="small" color="primary" />;
      return (
        <Typography variant="button" color="primary.dark">
          {r}p
        </Typography>
      );
    }
    return;
  }, []);

  return { resolution };
};
