import React, { useCallback } from 'react';

import Typography from '@mui/material/Typography';

export const useReleaseGroup = () => {
  const group = useCallback((group, author) => {
    if (group) {
      return (
        <Typography variant="button" color="secondary">
          {group}
        </Typography>
      );
    }
    if (author) {
      return (
        <Typography variant="button" color="secondary">
          [{author}]
        </Typography>
      );
    }
    return '';
  }, []);

  return { group };
};
