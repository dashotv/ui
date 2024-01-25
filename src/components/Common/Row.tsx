import React from 'react';

import { Paper } from '@mui/material';

export const Row = ({ variant, children }: { variant?: string; children: React.ReactNode }) => {
  let backgroundColor: string;
  switch (variant) {
    case 'selected':
      backgroundColor = '#222266';
      break;
    case 'transparent':
      backgroundColor = 'transparent';
      break;
    default:
      backgroundColor = 'auto';
  }
  return (
    <Paper
      elevation={0}
      sx={{ p: 0.5, '&:hover': { backgroundColor: '#242424' }, zIndex: 1000, backgroundColor: backgroundColor }}
    >
      {children}
    </Paper>
  );
};
