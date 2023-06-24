import React, { useCallback } from 'react';

import Chip from '@mui/material/Chip';

export const useReleaseResolution = () => {
  const resolution = useCallback(r => {
    if (r) {
      return <Chip label={r} size="small" color="primary" />;
    }
    return;
  }, []);

  return { resolution };
};
