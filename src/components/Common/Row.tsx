import React from 'react';

import { Paper } from '@mui/material';

export const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <Paper elevation={0} sx={{ pt: 0.5, pb: 0.5, '&:hover': { backgroundColor: '#242424' } }}>
      {children}
    </Paper>
  );
};
